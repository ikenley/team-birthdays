// define variables for dropdown menus
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// INITIALIZE BIRTHDAY FORM OBJECT
let birthdayInput = {
  firstName: "",
  lastName: "",
  age: "Old",
  deliveryMode: "Phone",
  birthdayString: "",
  email: "",
  phone: "",
  favoriteTreat: []
};

// DEFINE BIRTHDAY PARSING FUNCTIONS
birthdayInput.firstNameCheck = function() {
  if (this.firstName.length < 2) {
    alert(
      "Your first name should be at least two letters in length. Please try again."
    );
    this.firstName = "";
    return false;
  } else {
    return true;
  }
};

birthdayInput.lastNameCheck = function() {
  if (this.lastName.length < 2) {
    alert(
      "Your last name should be at least two letters in length. Please try again."
    );
    this.lastName = "";
    return false;
  } else {
    return true;
  }
};

birthdayInput.phoneCheck = function() {
  // using regex patterns
  var phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  var result = this.phone.match(phonePattern);
  if (result) {
    return true;
  } else {
    alert("Invalid phone number. Please try again.");
    this.phone = "";
    return false;
  }
};

birthdayInput.emailCheck = function() {
  // using regex patterns
  var emailPattern = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
  var result = this.email.match(emailPattern);
  if (result) {
    return true;
  } else {
    alert("Invalid e-mail. Please try again.");
    this.email = "";
    return false;
  }
};

// returns true if there are NO duplicates.
birthdayInput.treatCheck = function(flavor) {
  // check for treat duplicates in birthdayInput to allow for multiple checking and mind-changing
  for (let counter = 0; counter < this.favoriteTreat.length; counter++) {
    if (this.favoriteTreat[counter] === flavor) {
      return counter;
    }
  }
  return -1;
};

// FORM UPDATES
$(document).ready(function() {
  $("#firstName").change(function() {
    birthdayInput.firstName = $("#firstName").val();
    birthdayInput.firstNameCheck();
  });
  $("#lastName").change(function() {
    birthdayInput.lastName = $("#lastName").val();
    birthdayInput.lastNameCheck();
  });

  // Age
  $("#dropdown").change(function() {
    birthdayInput.age = $("#dropdown").val();
  });

  // DEFINE DELIVERY MODE PARSING INPUTS
  // html file dictates that deliveryMode is default set to phone in the birthday input form
  var deliveryMode = $("#deliveryPhone").val();

  // allow for multiple changes
  $("#deliveryEmail").click(function() {
    deliveryMode = $("#deliveryEmail").val();
    birthdayInput.deliveryMode = deliveryMode;
  });

  $("#deliveryPhone").click(function() {
    deliveryMode = $("#deliveryPhone").val();
    birthdayInput.deliveryMode = deliveryMode;
  });

  $("#deliverySong").click(function() {
    deliveryMode = $("#deliverySong").val();
    birthdayInput.deliveryMode = deliveryMode;
  });

  // DATEPICKER
  $("#datePicker").change(function() {
    if ($("#datePicker").val() !== null) {
      // if any date selected in datepicker
      birthdayInput.birthdayString = $("#datePicker").val();
    }
  });

  // E-mail
  $("#email").change(function() {
    birthdayInput.email = $("#email").val();
    birthdayInput.emailCheck();
  });

  // Phone number
  $("#phone").change(function() {
    birthdayInput.phone = $("#phone").val();
    birthdayInput.phoneCheck();
  });

  // treats!
  $("#sliceOfCake").on("change", function(e) {
    if (e.target.checked) {
      if (birthdayInput.treatCheck($("#sliceOfCake").val()) == -1) {
        birthdayInput.favoriteTreat.push($("#sliceOfCake").val());
      }
    } else {
      if (birthdayInput.treatCheck($("#sliceOfCake").val()) != -1) {
        birthdayInput.favoriteTreat.splice(
          birthdayInput.treatCheck($("#sliceOfCake").val()),
          1
        );
      }
    }
  });

  $("#pieALaMode").on("change", function(e) {
    if (e.target.checked) {
      if (birthdayInput.treatCheck($("#pieALaMode").val()) == -1) {
        birthdayInput.favoriteTreat.push($("#pieALaMode").val());
      }
    } else {
      if (birthdayInput.treatCheck($("#pieALaMode").val()) != -1) {
        birthdayInput.favoriteTreat.splice(
          birthdayInput.treatCheck($("#pieALaMode").val()),
          1
        );
      }
    }
  });

  $("#somethingSavory").on("change", function(e) {
    if (e.target.checked) {
      if (birthdayInput.treatCheck($("#somethingSavory").val()) == -1) {
        birthdayInput.favoriteTreat.push($("#somethingSavory").val());
      }
    } else {
      if (birthdayInput.treatCheck($("#somethingSavory").val()) != -1) {
        birthdayInput.favoriteTreat.splice(
          birthdayInput.treatCheck($("#somethingSavory").val()),
          1
        );
      }
    }
  });

  // PUSH TO BIRTHDAY CALENDAR
  $("#saveData").click(function() {
    if (
      birthdayInput.emailCheck() &&
      birthdayInput.phoneCheck() &&
      birthdayInput.lastNameCheck() &&
      birthdayInput.firstNameCheck() &&
      birthdayInput.birthdayString !== null &&
      birthdayInput.favoriteTreat.length > 0
    ) {
      var nameInput = birthdayInput.firstName + " " + birthdayInput.lastName;
      var d = new Date(birthdayInput.birthdayString);
      var mm = d.getMonth() + 1;
      var dd = d.getDate() + 1;
      addBirthday(
        nameInput,
        mm,
        dd,
        birthdayInput.favoriteTreat,
        birthdayInput.age,
        birthdayInput.deliveryMode,
        birthdayInput.email,
        birthdayInput.phone
      );
      $("#addBirthday").modal("hide");
    } else {
      alert(
        "Invalid input. Please review your answers and ensure you haven't missed any fields."
      );
    }
  });
});

// CREATE BIRTHDAY CALENDAR OBJECT
let birthdayCal = {
  month: ["January"],
  birthdays: [
    {
      name: "Faraz",
      mm: 1,
      dd: 25,
      treat: [],
      age: "Forever young",
      deliveryMode: "Song",
      email: "SalahudF@advisory.com",
      phone: ""
    }
  ]
};

// INITIALIZE W TEAM DATA
addBirthday("Ian", 3, 25, "", "", "", "", "");
addBirthday("Roshan", 4, 29, "", "", "", "", "");
addBirthday("Baby Aanya", 4, 15, "", "", "", "", "");
addBirthday("Cameron", 5, 7, "", "", "", "", "");
addBirthday("Paul", 5, 15, "", "", "", "", "");
addBirthday("Helen", 5, 19, "", "", "", "", "");
addBirthday("Eric", 5, 29, "", "", "", "", "");
addBirthday("Nidhi", 7, 9, "", "", "", "", "");
addBirthday("Kyle", 7, 22, "", "", "", "", "");
addBirthday("Avinash", 8, 18, "", "", "", "", "");
addBirthday("Alex", 8, 22, "", "", "", "", "");
addBirthday("Rachel", 8, 26, "", "", "", "", "");
addBirthday("Kenna", 9, 1, "", "", "", "", "");
addBirthday("Kaushik", 9, 20, "", "", "", "", "");
addBirthday("Shishir", 10, 17, "", "", "", "", "");
addBirthday("Gayathri", 11, 22, "", "", "", "", "");
addBirthday("Mo", 11, 29, "", "", "", "", "");

// edit this function to match on IDs
function addBirthday(name, mm, dd, treat, age, deliveryMode, email, phone) {
  let month = "";
  switch (mm) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
    default:
      console.log(
        "Invalid month. Month must be an integer value >=0 and <= 12"
      );
  }

  if (month.length > 0) {
    birthdayCal.month.push(month);
    birthdayCal.birthdays.push({
      name: name,
      mm: mm,
      dd: dd,
      treat: treat,
      age: age,
      deliveryMode: deliveryMode,
      email: email,
      phone: phone
    });
  } else {
    console.log("Hit an error somewhere. Calendar is unaffected.");
  }
}

// TODO
// CHECK ALL FIELDS FOR VALIDITY BEFORE SAVING
// ENABLE SAVE BUTTON TO PUSH DATA TO CALENDAR OBJECT
// PUBLISH
