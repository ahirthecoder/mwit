<template>
  <q-page class="relative-position"  >
     <q-scroll-area class="absolute full-height full-width">
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">

   
<div class="col">
 <q-input
    bottom-slots
     v-model="newMwiiContent"
      placeholder="What's happening"
       counter
        maxlength="280" 
         autogrow
         class="new-mwii"
       >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </template>
    
      
      </q-input>
</div>

<div class="col col-shrink">
   <q-btn
   @click="addNewMwit"
          unelevated 
          rounded 
          color="primary" 
          label="Mwii"
          no-caps 
          :disable="!newMwiiContent"
        class="q-mb-lg"
          />
</div>
  
 </div>


 <q-separator 
 class="divider"
 size="10px" 
 color="grey-2"
 />


 <q-list 
  separator
 >
     
<transition-group
  appear
  enter-active-class="animated fadeIn slow"
  leave-active-class="animated fadeOut slow"
>
      <q-item 
      class="mwit q-py-md"
      v-for="mwit in mwits"
      :key="mwit.id"
      >
        <q-item-section avatar top>
         <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1"> 
            <strong> Milan Jakhotra</strong>
            <span class="text-grey-7">
              @milan@jakhotra  
             <br class="lt-md">  &bull; {{mwit.date | relativeDate}}  
            </span>  
          </q-item-label>
          <q-item-label class="mwitLineContent text-body1">
          {{
            mwit.content
          }}
           </q-item-label>
          <div class="mwit-icons row justify-between q-mt-sm">
    <q-btn 
    flat 
    round 
    color="grey"
    size="sm" 
    icon="far fa-comment"
     />

     <q-btn 
    flat 
    round 
    color="grey"
    size="sm" 
    icon="fas fa-retweet"
     />


     <q-btn 
     @click="toggleLiked(mwit)"
    flat 
    round 
   :color="mwit.liked?'pink':'grey'"
    size="sm" 
    :icon="mwit.liked? 'fas fa-heart': 'far fa-heart' "
     />
     <q-btn 
     @click="deleteMwit(mwit)"
    flat 
    round 
    color="grey"
    size="sm" 
    icon="fas fa-trash"
     />
          </div>
        </q-item-section>

    
      </q-item>
</transition-group>
    </q-list>
 </q-scroll-area>
  </q-page>
  
</template>

<script>
import {formatDistance, subDays} from 'date-fns'
import db from "src/boot/firebase"

export default {
  name: 'PageHome',
  data(){
    return{
      newMwiiContent:"",
      mwits:[
        // {
        //   id:'101',
        // content:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident assumenda sunt optio saepe in corporis placeat sequi nisi odio quas voluptatum, quia est repudiandae ullam aspernatur deleniti. Sint, magnam ducimus.',
        // date:1615007707448,
        // liked:false
        // },
        //  {
        //    id:'102',
        // content:' milan Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident assumenda sunt optio saepe in corporis placeat sequi nisi odio quas voluptatum, quia est repudiandae ullam aspernatur deleniti. Sint, magnam ducimus.',
        // date:1615007762870,
        // liked:true
        // }

      ]
    }
  }
    ,
    methods:{
      addNewMwit(){
       let newMwit={
         content:this.newMwiiContent,
         date:Date.now(),
         liked:false
       }
      //  this.mwits.unshift(newMwit)
    // Add a new document in collection "cities"

    db.collection("mwits").add(newMwit)
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});


       this.newMwiiContent=''
      },
      deleteMwit(mwit){
      db.collection("mwits").doc(mwit.id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
      },
      toggleLiked(mwit){
    db.collection("mwits").doc(mwit.id).update({
    liked: !mwit.liked
})
.then(() => {
    console.log("Document successfully updated!");
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
      }
    }
    ,

    filters:{
      relativeDate(value){
      return formatDistance(value, new Date())
      }
    },
    mounted(){
      
      db.collection("mwits").orderBy("date").onSnapshot((snapshot) => {
              snapshot.docChanges().forEach((change) => {
                  let mwitChange= change.doc.data();
                  mwitChange.id= change.doc.id;
                  if (change.type === "added") {
                      console.log("New mwit: ",mwitChange );
                      this.mwits.unshift(mwitChange)
                  }
                  if (change.type === "modified") {
                      console.log("Modified mwit: ", mwitChange);
                      let index=this.mwits.findIndex(mwit=>mwit.id === mwitChange.id)
                    Object.assign(this.mwits[index],mwitChange)
                  }
                  if (change.type === "removed") {
                      console.log("Removed mweet: ", mwitChange);
                      let index=this.mwits.findIndex(mwit=>mwit.id === mwitChange.id)
                      this.mwits.splice(index,1)
                  }
              });
          });


    }
  
}
</script>

<style lang="sass">
.new-mwii
  textarea
  font: size 19px
  line-height:1.4 !important

.divider
  border-top:1px solid
  border-bottom:1px solid
  border-color:$grey-4
.mwit:not(:first-child)
 border-top:1px solid rgba(0,0,0,0.12)

.mwitLineContent
  white-space: pre-line  

.mwit-icons
  margin-left:-5px



</style>



