<template>
<v-container>
<v-layout row>
      <v-flex  md6 offset-sm3 >
       <div>
         <div >
           <v-btn @click="click1">choose a photo</v-btn>
           <input type="file" ref="input1"
            style="display: none"
            @change="previewImage" accept="image/*" >                
         </div>
 
       <div v-if="imageData!=null">                     
          <img class="preview" height="268" width="356" :src="img1">
       <br>
       </div>   
      
       </div>
       </v-flex>
    </v-layout>

    
</v-container>
</template>

<script> 

import { firebase } from '../main.js'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import 'firebase/storage'



export default {
  name: "ImageUploader",

  components: {},

  data () {
      return {
          img1: null,
          imageData: null
      }
  },

  methods: {
    click1() {
        this.$refs.input1.click()   
        },

    previewImage(event) {
        this.uploadValue=0;
        this.img1=null;
        this.imageData = event.target.files[0];
        this.onUpload()
    },

    onUpload(){
        this.img1=null;

        console.log("firebase is", firebase);
        const storage = getStorage(firebase);
        const storageRef = ref(storage, `${this.imageData.name}`);

        const uploadTask = uploadBytesResumable(storageRef, this.imageData);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    this.img1 = downloadURL;
                });
            }
);
        },  
    }


}

</script>

<style lang="sass" scoped>

</style>