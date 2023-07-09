const { Puff } = require("react-loader-spinner");

const Loader = () => {
  return (
    <Puff
      height="200"
      width="200"
      radius={1}
      color="#9C27B0"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
