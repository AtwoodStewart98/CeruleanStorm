angular.module("ceruleanstorm").service("writingSrvc", function($http) {
  this.uploadImage = (file, auth) => {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child("images/" + file.name).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function(error) {},
      function() {
        let downloadURL = [uploadTask.snapshot.downloadURL];
        console.log(downloadURL, auth);
        return $http.post(`/api/images`, downloadURL, auth);
      }
    );
  };
});
