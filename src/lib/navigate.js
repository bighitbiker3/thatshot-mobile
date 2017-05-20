export default (navigator) => (method, config = {}) => {
  navigator[method](config);
};
