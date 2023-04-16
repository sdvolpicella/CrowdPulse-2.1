import React from 'react';
import SearchUser from './SearchUser';
import SearchFilters from './SearchFilters';
import SearchText from './SearchText';
import SearchHashtag from './SearchHashtag';

class Filters extends React.Component{
    constructor (props) {
        super(props)
        this.sendData=this.sendData.bind(this)

        this.state = {
            totalTweets: 0,
            flagType: 0,
            counter : [],
            feelCounter:[],
            hatespeechCounter:[],
            oldData : [],
            data: [],
            tags : [],
            text : [],
            hashtags : [],
            users : [],
            dataGroupByDates: [],
            fromDate: null,
            toDate : null,
            flagGenre: 0,

        }
      
        
        this.getSentimentData(this.props.tweetsData.dataSortByDate.data)
    }

    componentDidUpdate(prevProps) {
      if(prevProps.mongodb!==this.props.mongodb){
        this.getSentimentData(this.props.tweetsData.dataSortByDate.data)
      }
      
    }

    getSentimentData = (data) => {

          
          
          var negative = 0;
          var positive = 0;
          var neutral = 0;
          var i=0;
          var joy = 0;
          var anger = 0;
          var sadness = 0;
          var fear =0;

          var acceptable = 0;
          var inappropriate = 0;
          var offensive = 0;
          var violent = 0;
          
          this.state.totalTweets = data.length;
          var feelCounter = [];
          var hatespeechCounter = [];
          while(i<data.length){
            if(data[i].sentiment!==undefined){
              if(data[i].sentiment['sent-it']!==undefined){
                if (data[i].sentiment['sent-it'].sentiment==='negative')
                  negative++
                else if (data[i].sentiment['sent-it'].sentiment==='positive')
                  positive ++
                else
                neutral ++
              }
            }
   
              i++
          }
          i=0
          
          while(i<data.length){
            if(data[i].sentiment!==undefined){
              if(data[i].sentiment['feel-it']!==undefined){
                if (data[i].sentiment['feel-it'].sentiment==='negative')
                  negative++
                else if (data[i].sentiment['feel-it'].sentiment==='positive')
                  positive ++
                else
                neutral ++
                
                
             //Get Emotion

                if(data[i].sentiment['feel-it'].emotion==='joy'){
                  joy++;
                }else if(data[i].sentiment['feel-it'].emotion==='anger'){
                  anger++;
                }else if(data[i].sentiment['feel-it'].emotion==='sadness'){
                  sadness++;
                }else if(data[i].sentiment['feel-it'].emotion==='fear'){
                  fear++;
                }
              }
          }        
          

          i++
        }

        i=0
        while(i<data.length){
          if(data[i].sentiment!==undefined){
            if(data[i].sentiment['hate_speech_it']!==undefined){
              if(data[i].sentiment['hate_speech_it'].hate_speech_level === 'acceptable'){
                acceptable++;
              }else if(data[i].sentiment['hate_speech_it'].hate_speech_level==='inappropriate'){
                inappropriate++;
              }else if(data[i].sentiment['hate_speech_it'].hate_speech_level==='offensive'){
                offensive++;
              }else if(data[i].sentiment['hate_speech_it'].hate_speech_level==='violent'){
                violent++;
              }

            }
          }
          i++
        }
        i=0

        feelCounter = {
          joy: joy,
          sadness: sadness,
          anger: anger,
          fear : fear
       }

        hatespeechCounter = {
          acceptable: acceptable,
          inappropriate: inappropriate,
          offensive: offensive,
          violent: violent
        }
        
    
          var tempCounter = {
              positive: positive,
              negative: negative,
              neutral: neutral,
           }
    
    
          this.setState({ counter: tempCounter })
          this.state.counter = tempCounter;
          this.setState({ feelCounter: feelCounter })
          this.state.feelCounter = feelCounter;

          this.setState({ hatespeechCounter: hatespeechCounter})
          this.state.hatespeechCounter = hatespeechCounter;

          this.setState({data : data})
          this.state.data = data;
          this.setState({oldData : data})
          this.state.oldData = data;

          

          var dataGroupByDates=[{
            id:null,
            counterPositive:null,
            counterNegative:null,
            counterNeutral:null,
          }];
  
         

          //MultiLine Charts

  
          var i = 0
          var j = 0
          
          if(this.state.data.length!==0){
            var dt = this.state.data[0].created_at.substring(0, 10)
            dataGroupByDates[0].id=dt
  
            while(i<this.state.data.length){
  
              if(dataGroupByDates[j].id===this.state.data[i].created_at.substring(0, 10)){
                if(this.state.data[i].sentiment['sent-it']!==undefined){
                  switch (this.state.data[i].sentiment['sent-it'].sentiment) {
                    case 'positive':
                      dataGroupByDates[j].counterPositive++;
                      break;
                    case 'negative':
                      dataGroupByDates[j].counterNegative++;
                      break;
                    case 'neutral':
                      dataGroupByDates[j].counterNeutral++;
                      break;
                  }
                }

                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  switch (this.state.data[i].sentiment['feel-it'].sentiment) {
                    case 'positive':
                      dataGroupByDates[j].counterPositive++;
                      break;
                    case 'negative':
                      dataGroupByDates[j].counterNegative++;
                      break;
                    case 'neutral':
                      dataGroupByDates[j].counterNeutral++;
                      break;
                  }
                }

               
              }else{
                  j++
                  dataGroupByDates.push({
                    id :this.state.data[i].created_at.substring(0, 10),
                    counterPositive:0,
                    counterNegative:0,
                    counterNeutral:0,
                  })             
              }
              i++
            }
            
          }
  
          this.setState({dataGroupByDates : dataGroupByDates});
          this.state.dataGroupByDates=dataGroupByDates;       
          this.sendData();
      }    
      
    
      //DATES FILTERS
      
      handleFromDatesChanges = (event) => {
        if(event.target.value!==""){
          this.state.fromDate = event.target.value
          if(this.state.data.length===0){
            this.state.data= this.state.oldData
            this.filterDataByDates()
            this.resetFilter()
          }else{
            this.filterDataByDates()
          }
         
        }else{
          this.resetFilter()
        }
      }
    
      handleToDatesChanges = (event) => {
        if(event.target.value!==""){
          this.state.toDate = event.target.value
          if(this.state.data.length===0){
            this.state.data= this.state.oldData
            this.filterDataByDates()
            this.resetFilter()
          }else{
            this.filterDataByDates()
          }
        }else{
          this.resetFilter()
        }
    
      }
    
    
      filterDataByDates = () => {   
          var tempData = []
          var i=0
          var j=0
    
          if(this.state.fromDate===null){
           //fromdate Null
    
    
           while(i<this.state.data.length){
            if (this.state.data[i].created_at<this.state.toDate){
              tempData[j]= this.state.data[i]
              j++
            }else if (this.state.data[i].created_at<this.state.toDate){
              tempData[j]= this.state.data[i]
              j++
            }else if (this.state.data[i].created_at<this.state.toDate ){
              tempData[j]= this.state.data[i]
              j++
            }            
    
            i++
        }

        this.state.data = tempData//set Data
    
          }else if(this.state.toDate===null){
            //todate Null                           
                                      
           while(i<this.state.data.length){
            if (this.state.data[i].created_at>this.state.fromDate){
                tempData[j]= this.state.data[i]
                j++
            }else if (this.state.data[i].created_at>this.state.fromDate){
                tempData[j]= this.state.data[i]
                j++
            }else if (this.state.data[i].created_at>this.state.fromDate ){
                tempData[j]= this.state.data[i]
                j++
            }
                   
            i++
        }
    
    
        this.state.data = tempData //save filtered datas
    
          }else if(this.state.fromDate!==null && this.state.fromDate!==null){
                   
            while(i<this.state.data.length){
              if (this.state.data[i].created_at>this.state.fromDate
              && this.state.data[i].created_at<this.state.toDate){
                tempData[j]= this.state.data[i]
                j++
              }else if (this.state.data[i].created_at>this.state.fromDate
              && this.state.data[i].created_at<this.state.toDate){
                tempData[j]= this.state.data[i]
                j++
              }else if (this.state.data[i].created_at>this.state.fromDate
                  && this.state.data[i].created_at<this.state.toDate){
                    tempData[j]= this.state.data[i]
                    j++
                  }
               
    
              i++
          }
    
         this.state.data = tempData //set Data
    
          }

          this.handleQuery()
    
    
      }

      //END DATES FILTERS
    
      // CATEGORY
      handleCategory = (event) => {
        this.state.flagType = event.target.value        
        this.handleQuery()
      }

      //END CATEGORY



      handleTags = (tags) => {
        if(tags.length>this.state.tags.length){
          this.state.tags = tags
          this.filterByTags(tags)
          this.handleQuery()
        }else{
          this.state.tags = tags
          this.resetFilter()

        }
      }
      
      filterByTags = (tags) => {
        
        var i =0
        var j =0
        var k = 0
        var z = 0
        var temp
        var tempData = []
        var flag = false

        //this.setState({oldData: this.state.data}) //save last data state
        
        while(i<this.state.data.length){
          j=0
          if(this.state.data[i].tags!==undefined){
            while(j<this.state.data[i].tags.tag_me.length){
              temp=this.state.data[i].tags.tag_me[j].split(" : ")
              
              while(k<tags.length){
                if(temp.some(a => a.includes(tags[k].name))===true){
                  flag = true               
                }else{
                  flag = false
                }
                k++
              }
  
              if(flag===true){
                tempData[z]= this.state.data[i]
                z++
              }
              k=0
              j++
            }
          }

          i++
        }

        this.state.data = tempData //set Data
        
        
        
      }


      
/// TEXT SECTION

handleText = (text) => {
  if(text.length>this.state.text.length){

    this.state.text=text 
    this.filterByText(text)
    this.handleQuery()
  }else{
   this.state.text=text 
   this.resetFilter()
  }
}

filterByText = (text) => {

  var i =0
  var j =0
  var k = 0
  var z = 0
  var temp
  var tempData = []
  var flag = false
  
  while(i<this.state.data.length){
    j=0
    if(this.state.data[i].spacy!==undefined){
      while(j<this.state.data[i].spacy.processed_text.length){
        temp=this.state.data[i].spacy.processed_text[j].split(" ")
        
        while(k<text.length){
          if(temp.some(a => a.includes(text[k].name))===true){
            flag = true               
          }else{
            flag = false
          }
          k++
        }
  
        if(flag===true){
          tempData[z]= this.state.data[i]
          z++
        }
        k=0
        j++
      }
    }

    i++
  }

 
  this.state.data=tempData
  this.state.totalTweets=tempData.length

  
}

/// HASHTAGS SECTION

handleHashtags = (hashtags) => {
  if(hashtags.length>this.state.hashtags.length){
    this.state.hashtags=hashtags
    this.filterByHashtags(hashtags)
    this.handleQuery()
  }else{
    this.state.hashtags=hashtags
    this.resetFilter()
  }
}

filterByHashtags = (hashtags) => {
  var i =0
  var j =0
  var k = 0
  var z = 0
  var temp
  var tempData = []
  var flag = false

  while(i<this.state.data.length){
    j=0
    if(this.state.data[i].twitter_entities!==undefined){
    if(this.state.data[i].twitter_entities.hashtags!==undefined){
      while(j<this.state.data[i].twitter_entities.hashtags.length){
        temp=this.state.data[i].twitter_entities.hashtags[j]
       
        while(k<hashtags.length){
          if(temp===hashtags[k].name){
            flag = true               
          }else{
            flag = false
          }
          k++
        }

        if(flag===true){
          tempData[z]= this.state.data[i]
          z++
        }
        k=0
        j++
      }
    }
  }

    i++
  }

         
  this.state.data=tempData
  this.state.totalTweets=tempData.length
  
}


///USERS Section

handleUsers = (users) => {
  if(users.length>this.state.users.length){
    this.state.users=users
    this.filterByUser(users)
    this.handleQuery()
  }else{
    this.state.users=users
    this.resetFilter()
  }
}

filterByUser = (users) => {
  var i =0
  var j =0
  var k = 0

  var tempData = []
  var flag = false
  
  while(i<this.state.data.length){
    j=0   
      while(j<users.length){
        if(this.state.data[i].author_name===users[j].name){
         
          flag = true
          break;               
        }else{
          flag = false
        }
        j++;
      }
      if(flag===true){
        tempData[k]= this.state.data[i];
        k++
      }
    i++;
  }

         
  this.state.data=tempData
  this.state.totalTweets=tempData.length
  
}

  //GENRE CLASSIFICATION
  handleGenre = (event) => {
    if(this.state.flagGenre!==0){
      this.state.flagGenre = event.target.value;
      this.state.data = this.state.oldData;
      this.resetFilter();
      this.filterByGenre();
    }else if(this.state.flagGenre==0 && event.target.value == 0){

      this.state.flagGenre = event.target.value;
      this.state.data = this.state.oldData;
      this.resetFilter();

    }else{
      this.state.flagGenre = event.target.value;
      this.filterByGenre();
    }
  }

  filterByGenre = () => {

    var i=0;
    var k=0;
    var temp=[]

    if(this.state.flagGenre===0 || this.state.flagGenre==='0'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
              temp[k] = this.state.data[i];
              k++;
            
          }


        }
        i++;
      }

    }else if(this.state.flagGenre===1 || this.state.flagGenre==='1'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='Information/Explanation'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }

    }else if(this.state.flagGenre===2 || this.state.flagGenre==='2'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='Instruction'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }

    }else if(this.state.flagGenre===3 || this.state.flagGenre==='3'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='Legal'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }

    }else if(this.state.flagGenre===4 || this.state.flagGenre==='4'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='News'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }

      
    }else if(this.state.flagGenre===5 || this.state.flagGenre==='5'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='Opinion/Argumentation'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }


    }else if(this.state.flagGenre===6 || this.state.flagGenre==='6'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='Promotion'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }


    }else if(this.state.flagGenre===7 || this.state.flagGenre==='7'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='Forum'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }


    }else if(this.state.flagGenre===8 || this.state.flagGenre==='8'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='Prose/Lyrical'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }


    }else if(this.state.flagGenre===9 || this.state.flagGenre==='9'){

      while(i<this.state.data.length){
        if(this.state.data[i].genre_classification!==undefined){
          if(this.state.data[i].genre_classification['roberta']!==undefined){
            if(this.state.data[i].genre_classification['roberta'].genre==='Other'){
              temp[k] = this.state.data[i];
              k++;
            }
          }


        }
        i++;
      }


    }

    this.state.data = temp
    this.handleQuery();

  }


  //QUERY SECTION  
handleQuery = () => {
  if(this.state.data.length===0){
    
    var temp_hatespeechCounter = {
      acceptable:0,
      inappropriate:0,
      offensive:0,
      violent:0
    }

    var temp_feelCounter = {
       joy:0,
       sadness:0,
       anger:0,
       fear:0
    }

    var tempCounter = {
      positive:0,
      negative:0,
      neutral:0
    }

    this.state.totalTweets=0
    this.state.counter = tempCounter //reset 
    this.state.hatespeechCounter = temp_hatespeechCounter
    this.state.feelCounter = temp_feelCounter
    this.sendData()
    
  }else{
    this.state.totalTweets=this.state.data.length
    this.query()
  }
}

      query = () => {
       
        var negative = 0;
        var positive = 0;
        var neutral = 0;
        var joy = 0;
        var sadness=0;
        var anger = 0;
        var fear = 0;

        var acceptable = 0;
        var inappropriate = 0;
        var offensive = 0;
        var violent = 0;


        var i=0;
        var tempCounter;
        var feelCounter;

        var hatespeechCounter;
        
        if (this.state.flagType===0 || this.state.flagType==='0') { //all                
        i=0;
          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
              if(this.state.data[i].sentiment['sent-it']!==undefined){
            
            if (this.state.data[i].sentiment['sent-it'].sentiment==='negative')
              negative++
            else if (this.state.data[i].sentiment['sent-it'].sentiment==='positive')
              positive ++
            else
              neutral ++
              }
            }
            i++
          }
          i=0;
          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
              if(this.state.data[i].sentiment['feel-it']!==undefined){
            if (this.state.data[i].sentiment['feel-it'].sentiment==='negative')
              negative++
            else if (this.state.data[i].sentiment['feel-it'].sentiment==='positive')
              positive ++
            else
              neutral ++
              }}
            i++
          }
    
          tempCounter = {
            positive: positive,
            negative: negative,
            neutral: neutral,
         }

        }else if(this.state.flagType===1 || this.state.flagType==='1'){ //sent-it
          
          while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['sent-it']!==undefined){

            if (this.state.data[i].sentiment['sent-it'].sentiment==='negative')
              negative++
            else if (this.state.data[i].sentiment['sent-it'].sentiment==='positive')
              positive ++
            else
              neutral ++
            

              }
            }
            i++
          }
          tempCounter = {
            positive: positive,
            negative: negative,
            neutral: neutral,
         }

          
        }else if(this.state.flagType===2 || this.state.flagType==='2'){ //feel-it
          
          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
              if(this.state.data[i].sentiment['feel-it']!==undefined){
            if (this.state.data[i].sentiment['feel-it'].sentiment==='negative')
              negative++
            else if (this.state.data[i].sentiment['feel-it'].sentiment==='positive')
              positive ++
            else
              neutral ++
              }
               //Get Emotion

              if(this.state.data[i].sentiment['feel-it'].emotion==='joy'){
                joy++;
              }else if(this.state.data[i].sentiment['feel-it'].emotion==='anger'){
                anger++;
              }else if(this.state.data[i].sentiment['feel-it'].emotion==='sadness'){
                sadness++;
              }else if(this.state.data[i].sentiment['feel-it'].emotion==='fear'){
                fear++;
              }
            }        
            

            i++
          }


          feelCounter = {
            joy: joy,
            sadness: sadness,
            anger: anger,
            fear : fear
         }

          tempCounter = {
            positive: positive,
            negative: negative,
            neutral: neutral,
         }

        }else if(this.state.flagType===3 || this.state.flagType==='3'){ //hate_speech_it

          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='acceptable'){
                  acceptable++;
                }else if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='inappropriate'){
                  inappropriate++;
                }else if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='offensive'){
                  offensive++;
                }else if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='violent'){
                  violent++;
                }
            }
            i++;
          }
          
          hatespeechCounter = {
            acceptable: acceptable,
            inappropriate: inappropriate,
            offensive: offensive,
            violent: violent
          }
        }
        
        this.state.counter = tempCounter
        this.state.feelCounter = feelCounter
        this.state.hatespeechCounter = hatespeechCounter

         

          

        var dataFeelGroupByDates=[{
          id:null,
          counterPositive:0,
          counterNegative:0,
          counterNeutral:0,
        }];

        var dataSentGroupByDates=[{
          id:null,
          counterPositive:0,
          counterNegative:0,
          counterNeutral:0,
        }];

        var dataGroupByDates=[{
          id:null,
          counterPositive:0,
          counterNegative:0,
          counterNeutral:0,
        }];

      
        

        //MultiLine Charts

        var j = 0;
        i = 0;
        if(this.state.data.length!==0){
          var dt = this.state.data[0].created_at.substring(0, 10)
          dataGroupByDates[0].id=dt
          dataSentGroupByDates[0].id=dt
          dataFeelGroupByDates[0].id=dt

          while(i<this.state.data.length){

            if(dataGroupByDates[j].id===this.state.data[i].created_at.substring(0, 10)){
              if(this.state.data[i].sentiment['sent-it']!==undefined){
                switch (this.state.data[i].sentiment['sent-it'].sentiment) {
                  case 'positive':
                    dataGroupByDates[j].counterPositive++;
                    dataSentGroupByDates[j].counterPositive++;
                    break;
                  case 'negative':
                    dataGroupByDates[j].counterNegative++;
                    dataSentGroupByDates[j].counterNegative++;
                    break;
                  case 'neutral':
                    dataGroupByDates[j].counterNeutral++;
                    dataSentGroupByDates[j].counterNeutral++;
                    break;
                }
              }

              if(this.state.data[i].sentiment['feel-it']!==undefined){
                switch (this.state.data[i].sentiment['feel-it'].sentiment) {
                  case 'positive':
                    dataGroupByDates[j].counterPositive++;
                    dataFeelGroupByDates[j].counterPositive++;
                    break;
                  case 'negative':
                    dataGroupByDates[j].counterNegative++;
                    dataFeelGroupByDates[j].counterNegative++;
                    break;
                  case 'neutral':
                    dataGroupByDates[j].counterNeutral++;
                    dataFeelGroupByDates[j].counterNeutral++;
                    break;
                }
              }

             
            }else{
                j++
                dataGroupByDates.push({
                  id :this.state.data[i].created_at.substring(0, 10),
                  counterPositive:0,
                  counterNegative:0,
                  counterNeutral:0,
                })

                dataSentGroupByDates.push({
                  id :this.state.data[i].created_at.substring(0, 10),
                  counterPositive:0,
                  counterNegative:0,
                  counterNeutral:0,
                })
                
                dataFeelGroupByDates.push({
                  id :this.state.data[i].created_at.substring(0, 10),
                  counterPositive:0,
                  counterNegative:0,
                  counterNeutral:0,
                })
           
            }
            i++
          }
          
        }

        
        if(this.state.flagType===0 ||this.state.flagType==='0'){
          this.setState({dataGroupByDates : dataGroupByDates});
          this.state.dataGroupByDates=dataGroupByDates;  
        }else if(this.state.flagType===1 ||this.state.flagType==='1'){
          this.setState({dataGroupByDates : dataSentGroupByDates});
          this.state.dataGroupByDates=dataSentGroupByDates;  
        }else if(this.state.flagType===2 ||this.state.flagType==='2'){
          this.setState({dataGroupByDates : dataFeelGroupByDates});
          this.state.dataGroupByDates=dataFeelGroupByDates;  
        }else if(this.state.flagType===3 ||this.state.flagType==='3'){
          this.setState({dataGroupByDates : dataFeelGroupByDates});
          this.state.dataGroupByDates=dataFeelGroupByDates;  
        }
        
        
        
        this.sendData()
      }


      resetFilter = () => {

        this.state.data= this.state.oldData

        if(this.state.fromDate!==null || this.state.toDate!==null ){
          this.filterDataByDates()
        }
        
        if(this.state.tags.length!==0){
          this.filterByTags(this.state.tags)
        }

        if(this.state.hashtags.length!==0){
          this.filterByHashtags(this.state.hashtags)
        }

        if(this.state.text.length!==0){
          this.filterByText(this.state.text)
        }

        if(this.state.users.length!==0){
          this.filterByUser(this.state.users)
        }

        this.handleQuery()

      }

    
      sendData = () =>{
        
        this.props.parentCallback(this.state.dataGroupByDates,this.state.counter,this.state.flagType,this.state.feelCounter,this.state.hatespeechCounter);
      }
      
      

    
    render(){
        return(            
          <>
            <div className="row stat-cards">
              <div className="col-md-4 col-xl-4">
                <article className="stat-cards-item">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="stat-cards-info">
                        <center><h4>Algorithm</h4><br />
                          <select id="sel1" onChange={this.handleCategory} >
                            <option value="0">All</option>
                            <option value="1">Sent-it</option>
                            <option value="2">Feel-it</option>
                            <option value="3">hate_speech_it</option>

                          </select>

                        </center>
                      </div>
                    </div>


                  </div>

                </article>
              </div>
              <div className="col-md-3 col-xl-3">
                <article className="stat-cards-item">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="stat-cards-info">
                        <center><h4>Genre</h4><br />
                          <select id="sel1" onChange={this.handleGenre}>
                            <option value = "0">All</option>
                            <option value="1">Information/Explanation</option>
                            <option value="2">Instruction</option>
                            <option value="3">Legal</option>
                            <option value="4">News</option>
                            <option value="5">Opinion/Argumentation</option>
                            <option value="6">Promotion</option>
                            <option value="7">Forum</option>
                            <option value="8">Prose/Lyrical</option>
                            <option value="9">Other</option>
                          </select>
                        </center>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <div className="col-md-3 col-xl-3">
                <article className="stat-cards-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="stat-cards-info">
                        <center><h4>From </h4><br />
                          <input type="date" 
                          name="startDate"
                          onBlur={this.handleFromDatesChanges}/>

                          
                        </center>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="stat-cards-info">
                        <center><h4>To </h4><br />
                          <input type="date"
                          id="toDate"
                          onBlur={this.handleToDatesChanges} />
                        </center>
                      </div>
                    </div> 
                
                  </div>

                </article>
              </div>
              <div className="col-md-2 col-xl-2">
                <article className="stat-cards-item">
                  <div className="row">
                    <div className="col-md-12 col-xl-12">
                      <div className="stat-cards-info">
                        <center><h4>Total Tweets</h4><br />
                           <h1> {this.state.totalTweets} </h1>
                          
                        </center>
                      </div>
                    </div>


                  </div>

                </article>
              </div>
            </div>
            <br></br>
            <div className="row stat-cards">
            <div className="col-md-3 col-xl-3">
              <article className="stat-cards-item">
                <div className="row">
    
                  <div className="col-md-12 col-xl-12">
                    <div className="stat-cards-info">
                      <center><h4>Tags</h4><br />
                      <SearchFilters parentCallback = {this.handleTags.bind(this)} db = {this.props.db} allTags = {this.props.tweetsData.dataTags}/>
                        
                      </center>
                    </div>
                  </div>
    
    
                </div>
    
              </article>
            </div>
    
            <div className="col-md-3 col-xl-3">
              <article className="stat-cards-item">
                <div className="row">
    
                  <div className="col-md-12 col-xl-12">
                    <div className="stat-cards-info">
                      <center><h4>Processed Text</h4><br />
                      <SearchText parentCallback = {this.handleText.bind(this)} db = {this.props.db} allText = {this.props.tweetsData.dataText}/>
                        
                      </center>
                    </div>
                  </div>
    
    
                </div>
    
              </article>
            </div>
    
            <div className="col-md-3 col-xl-3">
              <article className="stat-cards-item">
                <div className="row">
    
                  <div className="col-md-12 col-xl-12">
                    <div className="stat-cards-info">
                      <center><h4>Hashtags</h4><br />
                      <SearchHashtag parentCallback = {this.handleHashtags.bind(this)} db = {this.props.db} allHashtags = {this.props.tweetsData.dataHashtags}/>
                        
                      </center>
                    </div>
                  </div>
    
    
                </div>
    
              </article>
            </div>


            <div className="col-md-3 col-xl-3">
              <article className="stat-cards-item">
                <div className="row">
    
                  <div className="col-md-12 col-xl-12">
                    <div className="stat-cards-info">
                      <center><h4>Username</h4><br />
                      <SearchUser parentCallback = {this.handleUsers.bind(this)} db = {this.props.db} allUser = {this.props.tweetsData.users}/>
                        
                      </center>
                    </div>
                  </div>
    
    
                </div>
    
              </article>
            </div>
    
    
          </div>
          </>
      )
    }
}

export default Filters