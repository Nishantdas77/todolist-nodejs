
module.exports.getDate = getDate;

function getDate() {

const today = new Date();
// var currentDay = today.getDay();
const options ={
  weekday:"long",
  day:"numeric",
  month:"long"
};
const day = today.toLocaleDateString("en-IN",options);
return day;
}



exports.getDay= function() {

const today = new Date();
// const currentDay = today.getDay();
const options ={
    weekday:"long",

  
};
 return today.toLocaleDateString("en-IN",options);

}