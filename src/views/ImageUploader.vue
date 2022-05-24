<script lang="ts">
    import BoxSVG from "../components/BoxSVG.vue";
    import ImageUpload from "../services/UploadService";
    import { ImageInfo } from '../data/ImageInfo';
    import ToastMsg from "../components/ToastMsg.vue";

    const widthOffset = 600;
    const heightOffset = 200;
    export default {
        name: "Imageuploader",
        data() {
            return {
                image: null,
                imageSrc: null,
                error: false,
                errorMsg : undefined,
                loading : false,
                imageInfo : new ImageInfo(),
                btn_disabled : 'btn_disabled'
            };
        },
        
        methods: {
            onFileChange(event : any) {
                this.init();
                let files = event.target.files;
                if (!files.length)
                    return;
                let file = files[0] 
                if (file.type.match('image.*')){
                    this.uploadFile(file);
                } else {
                    this.error = true; 
                    this.$toast.open({
                        message: "Only images are allowed",
                        type: "info",
                        duration: 2000,
                        position: "top-right",
                        dismissible: true
                    })
                }    
            },

            init () {
                this.response = [];
                this.imageSrc = '';
                this.errorMsg = undefined;
            },

            onClick ( event : any) {
                event.target.value = null
            },

            async uploadFile(file : any) {
                
                var image = new Image();
                image.src = URL.createObjectURL(file);
                image.onload = () => {
                    this.imageInfo.actualWidth = image.width;
                    this.imageInfo.actualHeight = image.height;
                    this.imageInfo.width = image.width;
                    this.imageInfo.height = image.height;
                };
                
                this.loading = true;
                this.response = await ImageUpload(file, this);
                this.loading = false;
                this.imageSrc = URL.createObjectURL(file);
                
            },
        
        },
        
        components: { BoxSVG, ToastMsg }
    }

</script>

<template>
    <v-container class="container">
        <v-row style="padding-bottom: 25px;">
            <v-col md="3" lg="3"></v-col>
            <v-col md="4" lg="4" sm="12">
                <!-- <v-file-input accept="image/*"   label="File input"></v-file-input> -->
                
                <div class="upload-box">
                    <label for="file-upload" :class="[loading ? btn_disabled : '']" class="custom-file-upload">
                        Select 
                    </label>
                    <input :disabled="loading" id="file-upload" 
                    @change="onFileChange" @click="onClick" type="file"/>
                    <label class="upload-box-label">
                        Upload Image
                    </label>
                </div>  
            </v-col>
        </v-row>
        <v-row>
            <!-- <v-col md="3" lg="3"></v-col> -->
            <v-col md="12" lg="12" style="text-align: center;">
                <svg v-if="imageSrc && imageInfo" :style="{'height': imageInfo.height,'width' : imageInfo.width}" >
                    <image id='myImgId' :href="imageSrc" :style="{'height': imageInfo.height,'width' : imageInfo.width}" />
                    <BoxSVG v-if="response" v-for="box in response.boxes" :objectInfo=box :imageInfo=imageInfo />
                </svg>
            </v-col>
        </v-row>
    </v-container>

    <v-progress-linear v-if="loading" class="progress-bar" color="blue" indeterminate  rounded height="3" >
    </v-progress-linear>
</template>

<style>

.container{
    max-width: 100%;
    overflow: auto;
}

.btn_disabled{
    background: #cdcdcd !important;
}

.progress-bar{
    top: 0;
    position: absolute !important;;
}

.img-style {
    width: 100%; 
    height: 100%;
    object-fit: contain; 
}

.image-box {
    width: calc(80vw - 100px);
    height: calc(80vh - 100px);
    /* margin-top: 15px;
    margin-left: 110px; */
}

.upload-box-label{
    color: #444444;
}

.upload-box {
    border: 1px dashed #bdbbbb;
    padding: 8px;
    text-align: left;
    margin-left: 140px
}

input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 8px;
    color: white;
    background: #7070f3;
}
</style>