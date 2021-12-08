const inputValidator = (type, inputValue) => {
  // console.log("validator on / " + type + " / " + inputValue);
  switch (type) {
    case "email":
      let re = /\S+@\S+\.\S+/;
      return re.test(inputValue);
    case "psw":
      return inputValue.length > 5;
    case "verificationCode":
      return inputValue.length > 10;
    default:
      return inputValue.length > 5;
  }
};

export default inputValidator;
