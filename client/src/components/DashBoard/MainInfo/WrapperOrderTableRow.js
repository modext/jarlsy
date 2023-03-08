import OrderTableRow from "./OrderTableRow";

function WrapperOrderTableRow({
  viewFunc,
  editFunc,
  setActionWithId,
  tableData,
  type,
  modal,
  deleteFunc
}) {
  return (
    <>
      <OrderTableRow
        setActionWithId={setActionWithId}
        type={type}
        detailedItem={tableData}
        edit={() => {
          editFunc(tableData);
        }}
        deleteItem={() => {
          deleteFunc(tableData.id);
        }}
        view={() => {
          viewFunc(tableData);
        }}
        modal={modal}
      ></OrderTableRow>
    </>
  );
}

export default WrapperOrderTableRow;
