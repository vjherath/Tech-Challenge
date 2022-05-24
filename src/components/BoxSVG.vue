<template>
    <svg >
        <rect v-bind:x= x_ v-bind:y= y_  rx="6" v-bind:width= width v-bind:height= height
                v-bind:stroke=color stroke-width="2" fill="none" />
    </svg>
</template>

<script lang="ts">
    import { ObjectInfo } from '../data/ObjectInfo';
    import { ObjectTypeEnum } from '../data/ObjectTypeEnum';

    let x_min : number;
    let y_min : number;
    const percentage = 100;
    const percentageSign = "%";
    export default {
        name: 'BoxSVG',
        props: {
                objectInfo : ObjectInfo,
                imageInfo : Object
        },
        data() {
            return {
                x_: this.calculateX (this.objectInfo.bbox[0]) ,
                y_ : this.calculateY (this.objectInfo.bbox[1]) ,
                 width: this.calculateWidth (this.objectInfo.bbox[2]) ,
                height: this.calculateHeight (this.objectInfo.bbox[3]) ,
                color : this.checkObjectType (this.objectInfo.label)
            };
         },
        methods : {
            
            calculateX (value : number) {
                this.x_min = (value * percentage).toFixed(2);
                return this.x_min + percentageSign ;
            },

            calculateY (value : number) {
                this.y_min = (value * percentage).toFixed(2);
                return this.y_min + percentageSign;
            },
          
            calculateWidth (value : number) {
                let x_max = (value * percentage);
                return (x_max - this.x_min).toFixed(2) + percentageSign;
            },

            calculateHeight (value : number) {
                let y_max = value * percentage;
                return (y_max - this.y_min).toFixed(2) + percentageSign;
            },

            checkObjectType (label : string) {
                switch (label) {
                    case ObjectTypeEnum.PERSON : {
                        return '#44F64E'
                    }
                    case ObjectTypeEnum.LIGHT_VEHICLE : {
                        return '#2849FB'
                    }
                }
            }
     }
}
</script>

<style scoped>
 /* Scoped CSS here */
</style>