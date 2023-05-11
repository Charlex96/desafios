
const validateNumber = (number) =>{
    return number && ! isNaN(number) && number > 0;
};

export default validateNumber;
