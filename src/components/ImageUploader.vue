<template>
<v-container>
   <v-layout >
      <v-flex >
       <div>
         <v-flex >
           <v-btn block elevation="5" @click="click1"> {{ uploadButtonLabel }}</v-btn>
           <input type="file" ref="input1"
            style="display: none"
            @change="previewImage" accept="image/png, image/gif, image/jpeg" > 
            <v-flex v-if="!hideHints" offset-2 align-self-center>
                <span>Accepted image formats: png, jpg, gif</span> 
            </v-flex>

            <v-flex v-if="!hideHints" offset-3 align-self-center>
                <span>Size limit: {{ fileSizeLimit/1000000 }} MB</span> 
            </v-flex>

            <v-flex>
                <span class="error-message">{{ errorMessage }}</span> 
            </v-flex>
           
         </v-flex>
       </div>
      </v-flex>
    </v-layout>
    <br>  
    <v-flex v-if="state === 'loaded'">          
        <img class="preview" :src="imageUrl">
    </v-flex> 

    <v-flex  md6 offset-sm4  v-if="state === 'loading'">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

        <div>
            <span> Uploading </span>
        </div>
    </v-flex> 

    
</v-container>
</template>

<script> 

import { firebase, eventBus } from '../main.js'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default {
  name: "ImageUploader",

  components: {},

  data () {
      return {
          imageUrl: null,
          imageData: null,
          state: "",
          uploadButtonLabel: "Upload a photo",
          fileSizeLimit: 10**7,
          errorMessage: "",
          hideHints: false
      }
  },

  methods: {
    click1() {
        this.$refs.input1.click()   
        },

    previewImage(event) {
        this.uploadValue=0;
        this.imageUrl=null;
        this.imageData = event.target.files[0];

        console.log("file size", this.imageData.size)
        if (this.imageData.size < this.fileSizeLimit) {
          this.onUpload()
        } else {
            this.hideHints = true;
            this.errorMessage = `Your image [ ${this.bytesToMegaBytesConverter(this.imageData.size)} MB ] exceeds the accepted size limit [${this.bytesToMegaBytesConverter(this.fileSizeLimit)} MB ], Please try a different image!`

            setTimeout(() => {
              this.errorMessage = "",
              this.hideHints = false
            }, 10000);
          
        }
        
    },

    bytesToMegaBytesConverter(bytes) {
      return (bytes / 1000000).toFixed(2);
    },

    onUpload(){
        this.imageUrl=null;

        console.log("firebase is", firebase);
        const storage = getStorage(firebase);
        const storageRef = ref(storage, `${this.imageData.name}`);

        const uploadTask = uploadBytesResumable(storageRef, this.imageData);

        uploadTask.on('state_changed', 
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    this.state = 'loading';
                    break;
                case 'running':
                    console.log('Upload is running');
                    this.state = 'loading';
                    break;
                }
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    this.state = 'loaded';
                    this.uploadButtonLabel = "Change a Photo"
                    this.imageUrl = downloadURL;
                    eventBus.$emit("image-upload", downloadURL);
                });
            }
        );
        },  
    }


}

</script>

<style scoped>

.preview {
    height: 100%;
    width: 100%;
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: black;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  color: red
}

</style>