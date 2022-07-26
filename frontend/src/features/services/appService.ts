const addToPrevPolls = async (pollId: string) => {
  let prevPolls = (await localStorage.getItem("_prevPolls"))
    ? JSON.parse(localStorage.getItem("_prevPolls") || "")
    : [];
  if (prevPolls) {
    prevPolls.push(pollId);
    const newPolls = await localStorage.setItem(
      "_prevPolls",
      JSON.stringify(prevPolls)
    );
    return JSON.parse(localStorage.getItem("_prevPolls") || "");
  }
};

const appServices = { addToPrevPolls };
export default appServices;
