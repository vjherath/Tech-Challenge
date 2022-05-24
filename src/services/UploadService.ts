const proxyUrl = "https://calm-cliffs-11280.herokuapp.com/";
const baseUrl = proxyUrl + "https://europe-west1-promiseq-production2.cloudfunctions.net/detectObjectsFromImg";


export default async function ImageUpload(file: any, scope: any) {

    var formdata = new FormData();
    formdata.append("file", file);
    const requestOptions = {
          method: "POST",
          body: formdata,
    };

    await fetch(baseUrl, requestOptions)
    .then(async response => {
      
      if (response.ok) {
        return await response.json();
      }
      else 
      {
        scope.$toast.open({
          message: response.statusText,
          type: "info",
          duration: 2000,
          position: "top-right",
          dismissible: true
        });
        
      }

    })
    .catch(error => {
      scope.$toast.open({
        message: "Somthing went wrong",
        type: "error",
        duration: 2000,
        position: "top-right",
        dismissible: true
      });
    });
    
}