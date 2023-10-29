document.addEventListener("DOMContentLoaded", function(){
    const heading = document.querySelector('.welcome');
    heading.style.color= "black";
    heading.style.transform= "scale(1)";
});

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions
var fileobj;


button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
  file_browse();
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}


function upload_file(e) {
    e.preventDefault();
    fileobj = e.dataTransfer.files[0];
    js_file_upload(fileobj);

    
}

function file_browse() {
  document.getElementById('file').onchange = function() {
      fileobj = document.getElementById('file').files[0];
      js_file_upload(fileobj);

  };
}
$(document).ready(function () {
  $('#predictButton').on('click', function () {
      // Call the ML model by making an AJAX request
      $.ajax({
          url: '/predict',  // Update the URL to your Flask route for ML prediction
          method: 'GET',    // Use the appropriate HTTP method
          success: function (response) {
              // Handle the prediction result received from the server
              $('#predictionResult').text('Prediction: ' + response);
          }
      });
  });
});

// function js_file_upload(file_obj) {
//   if(file_obj != undefined) {
//       var form_data = new FormData();                  
//       form_data.append('file', file_obj);
//       var xhttp = new XMLHttpRequest();
//       xhttp.open("POST", "/upload", true);
//       xhttp.onload = function(event) {
         
//           if (xhttp.status == 200) {
//               console.log("Uploaded!");
//           } else {
//              alert(xhttp.status);
//           }
//       }

//       xhttp.send(form_data);
//   }
// }
 

function openNav() {
    document.getElementById("homeSidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("homeSidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }