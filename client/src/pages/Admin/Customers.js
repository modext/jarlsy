import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Customer from "../../components/DashBoard/MainInfo/Messages/Customer";
import MessageBox from "../../components/DashBoard/MainInfo/Messages/MessageBox";
import { db, storage } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImSpinner2 } from "react-icons/im";

function Customers() {
  let { pathname } = useLocation();
  const [selectedId, setSelectedMessages] = useState(null);
  const [fnd, setNotFnd] = useState("");
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  pathname = pathname.split("/")[1];
  let { adminId, id } = useParams();
  const firstRender = useRef(false);
  const [serverUpdate, setServerUpdated] = useState(false);
  const dispatch = useDispatch();

  async function uploadImageAddItem(file) {
    let name = file.name.split(".");
    const fileRef = ref(storage, "messageImages/" + name[0] + "." + name[1]);
    const snap = await uploadBytes(fileRef, file);
    const picUrl = await getDownloadURL(fileRef);
    return { url: picUrl, type: file.type };
  }

  function updateMessage(message, copy) {
    setSelectedMessages((prev) => {
      return {
        ...prev,
        messages: copy
          ? [...prev.messages, { ...message, message: [...copy] }]
          : [...prev.messages, { ...message }]
      };
    });
    if (!Array.isArray(message.message)) {
      updateDoc(doc(db, "users", user.uid, "messages", selectedId.id), {
        pendingMessage: true,
        messages: arrayUnion({ ...message })
      })
        .then(() => {
          return updateDoc(
            doc(
              db,
              "users",
              selectedId.correspondingUser,
              "messages",
              selectedId.id
            ),
            {
              pendingMessage: true,
              messages: arrayUnion({ ...message })
            }
          );
        })
        .then((_) => {});
    }

    if (Array.isArray(message.message)) {
      setLoader(true);
      let PromiseArr = [];
      message.message.forEach((item) => {
        PromiseArr.push(uploadImageAddItem(item));
      });
      Promise.all(PromiseArr)
        .then((res) => {
          message.message = res;
          return updateDoc(
            doc(db, "users", user.uid, "messages", selectedId.id),
            {
              pendingMessage: true,
              messages: arrayUnion({ ...message })
            }
          );
        })
        .then(() => {
          return updateDoc(
            doc(
              db,
              "users",
              selectedId.correspondingUser,
              "messages",
              selectedId.id
            ),
            {
              pendingMessage: true,
              messages: arrayUnion({ ...message })
            }
          );
        })
        .then(() => {
          setLoader(false);
        });
    }
  }

  useEffect(() => {
    let unsubscribe = null;
    if (user) {
      unsubscribe = onSnapshot(
        collection(db, "users", user.uid, "messages"),
        (_) => {
          setServerUpdated(true);
        }
      );
    }

    return unsubscribe && unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!firstRender.current && messages.length > 0) {
      let foundMessage = messages.find((item) => item.id === id);

      if (foundMessage) {
        setSelectedMessages({ ...foundMessage, pendingMessage: false });
        return;
      }
      setSelectedMessages({ ...messages[0], pendingMessage: false });
    }
    if (messages.length > 0) {
      firstRender.current = true;
    }
  }, [messages]);

  useEffect(() => {
    selectedId &&
      updateDoc(doc(db, "users", user.uid, "messages", selectedId.id), {
        pendingMessage: false
      });
  }, [selectedId]);

  async function getMessages() {
    let docs = await getDocs(collection(db, "users", user.uid, "messages"));
    if (docs.size === 0) {
      setNotFnd("No Chats Found");
      setLoading(true);
      return;
    }
    let messageCollection = [];
    docs.forEach((element) => {
      messageCollection.push({
        ...element.data(),
        id: element.id
      });
    });

    setMessages((_) => {
      return [...messageCollection];
    });
    dispatch({
      type: "MESSAGE_UPDATED",
      payload: messageCollection.filter((item) => item.pendingMessage === true)
        .length
    });
    if (serverUpdate && selectedId) {
      messageCollection.forEach((item) => {
        if (item.id === selectedId.id) {
          setSelectedMessages({ ...item });
        }
      });
    }
    setLoading(true);
    serverUpdate && setServerUpdated(false);
  }
  useEffect(() => {
    serverUpdate && user && getMessages();
  }, [serverUpdate, user]);

  useEffect(() => {
    async function sendMessage() {
      let response = await getDoc(doc(db, "users", adminId, "messages", id));
      if (!response.exists()) {
        let messageId = uuidv4();
        await setDoc(doc(db, "users", adminId, "messages", id), {
          userName: `Brance Support OD${id}`,
          timestamp: serverTimestamp(),
          correspondingUser: user.uid,
          pendingMessage: true,
          messages: arrayUnion({
            name: "Support Assistant",
            userId: adminId,
            message: `Hi ${user.displayName}, I'm the Support Assistant`,
            timestamp: new Date(),
            messageId: messageId
          })
        });
        await setDoc(doc(db, "users", user.uid, "messages", id), {
          userName: `Brance Support OD${id}`,
          timestamp: serverTimestamp(),
          correspondingUser: adminId,
          pendingMessage: true,
          messages: arrayUnion({
            name: "Support Assistant",
            userId: adminId,
            message: `Hi ${user.displayName}, I'm the Support Assistant`,
            timestamp: new Date(),
            messageId: messageId
          })
        });
      }
    }

    user && adminId && id && sendMessage();
  }, [adminId, id, user]);

  return (
    <div className={` ${pathname === "admin" ? "h-panel" : "h-full"} `}>
      <div
        className={`bg-white space-x-4 h-full relative flex shadow-sm_dark rounded-md  ${
          pathname === "admin" ? "mt-6" : "mt-0"
        }  p-small`}
      >
        {loading ? (
          <>
            <div className="w-[32%]">
              <div className="h-full">
                <div className="px-2.5">
                  <div className="font-medium  text-lg">All Chats</div>
                </div>
                <div className="relative h-full ">
                  <div
                    className={`mt-4 h-[93.5%] ${
                      messages.length > 6
                        ? "border-gray-200   rounded-md border-[.5px]"
                        : ""
                    }  no-scrollbar overflow-scroll`}
                  >
                    {messages.map((message, idx) => {
                      return (
                        <Customer
                          key={idx}
                          notifyParent={(val) => {
                            let data = messages.find((item) => item.id === val);
                            data &&
                              setSelectedMessages({
                                ...data,
                                pendingMessage: false
                              });
                          }}
                          selected={
                            selectedId !== null && message.id === selectedId.id
                          }
                          message={message}
                        ></Customer>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {selectedId !== null && (
              <MessageBox
                user={user}
                loader={loader}
                pathname={pathname}
                setMessage={updateMessage}
                pendingMessage={selectedId.pendingMessage}
                userName={selectedId.userName}
                messages={selectedId.messages}
              />
            )}
          </>
        ) : (
          <div className="flex absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <ImSpinner2 className="animate-spin fill-current text-[#FF385C] w-16 h-16"></ImSpinner2>
          </div>
        )}
        {fnd && (
          <div className="absolute text-[#FF385C] font-medium text-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {fnd}
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
