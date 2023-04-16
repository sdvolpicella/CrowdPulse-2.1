import SearchUser from './SearchUser';
import SearchFilters from './SearchFilters';
import SearchText from './SearchText';
import SearchHashtag from './SearchHashtag';
import React, { useEffect } from 'react';



class Filters extends React.Component{

    constructor (props) {
        super(props)
        this.query=this.query.bind(this)

        this.state = {
          totalTweets: 0,
          flagType: 0,
          flagSentiment : 0,
          counter : [],
          oldData : [],
          data: [],
          tags : [],
          text : [],
          users : [],
          hashtags : [],
          fromDate: null,
          toDate : null,
          flagGenre: 0,

      }
     
      this.getData(this.props.tweetsData.dataSortByDate.data);
   

      this.state.totalTweets = this.props.tweetsData.dataSortByDate.data.length;
      
      this.query()
    }

    componentDidUpdate(prevProps) {
      if(prevProps.mongodb!==this.props.mongodb){
        this.getData(this.props.tweetsData.dataSortByDate.data)
      }
      
    }

    getData = (Alldata) => {
           
          const data = Alldata;
          this.state.data = Alldata;
          this.state.oldData = Alldata
          
          this.setState({totalTweets : data.length})
          this.query()

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
      
      //TAGS SECTION

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

       
        this.state.data=tempData
        this.state.totalTweets=tempData.length
        this.handleQuery()
        
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
        this.handleQuery()
        
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
        this.handleQuery()
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

      //RESET SECTIOn
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


            // CATEGORY
      
      
      filterByCategory = () => {

        var i=0;
        var k = 0;
        var temp = []
        var flagAll = 0;
        
        if (this.state.flagType===0 || this.state.flagType==='0') { //ALL
          if(this.state.flagSentiment==='All'){
            while(i<this.state.data.length){
              if(this.state.data[i]!==undefined){
                if(this.state.data[i]!==undefined){
                    temp[k]=this.state.data[i];
                    k++;
                    flagAll = 1;
                }
                if(this.state.data[i].sentiment['feel-it']!==undefined && flagAll===0){
                  if(this.state.data[i].sentiment['feel-it'].sentiment==='positive'){
                    temp[k]=this.state.data[i];
                    k++;
                  }               
                }
              }
              flagAll=0;
              i++;
            }

          }else if(this.state.flagSentiment==='Positive'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['sent-it']!==undefined){
                  if(this.state.data[i].sentiment['sent-it'].sentiment==='positive'){
                    temp[k]=this.state.data[i];
                    k++;
                    flagAll = 1;
                  }
                }
                if(this.state.data[i].sentiment['feel-it']!==undefined && flagAll===0){
                  if(this.state.data[i].sentiment['feel-it'].sentiment==='positive'){
                    temp[k]=this.state.data[i];
                    k++;
                  }
                                   
                }
              }
              flagAll=0;
              i++;
            }

          }else if(this.state.flagSentiment==='Neutral'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['sent-it']!==undefined){
                  if(this.state.data[i].sentiment['sent-it'].sentiment==='neutral'){
                    flagAll = 1;
                    temp[k]=this.state.data[i];
                    k++;   
                  }
                }
                if(this.state.data[i].sentiment['feel-it']!==undefined  && flagAll===0){
                  if(this.state.data[i].sentiment['feel-it'].sentiment==='neutral'){
                    temp[k]=this.state.data[i];
                    k++;
                  }
                                   
                }
              }
              flagAll=0;
              i++;
            }

          }else if(this.state.flagSentiment==='Negative'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['sent-it']!==undefined){
                  if(this.state.data[i].sentiment['sent-it'].sentiment==='negative'){
                    flagAll = 1;
                    temp[k]=this.state.data[i];
                    k++;   
                  } 
                }
                if(this.state.data[i].sentiment['feel-it']!==undefined  && flagAll===0){
                 
                  if(this.state.data[i].sentiment['feel-it'].sentiment==='negative'){
                    temp[k]=this.state.data[i];
                    k++;
                  }
                                   
                }
              }
              i++;
              flagAll=0;
            }

          }else if(this.state.flagSentiment==='Joy'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].emotion==='joy')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Sadness'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].emotion==='sadness')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Anger'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].emotion==='anger')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Fear'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].emotion==='fear')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Acceptable'){
            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                  if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='acceptable')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }
          }else if(this.state.flagSentiment==='Inappropriate'){
            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                  if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='inappropriate')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }
          }else if(this.state.flagSentiment==='Offensive'){
            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                  if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='offensive')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }
          }else if(this.state.flagSentiment==='Violent'){
            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                  if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='violent')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }
          }

          //Category Sent-it

        }else if(this.state.flagType===1 || this.state.flagType==='1'){

          if (this.state.flagSentiment==='All'){
            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['sent-it']!==undefined){
                  temp[k]=this.state.data[i];
                  k++;   
                }
             }
            i++;
          }
          }else if(this.state.flagSentiment==='Positive'){
            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['sent-it']!==undefined){
                  if(this.state.data[i].sentiment['sent-it'].sentiment==='positive'){
                    temp[k]=this.state.data[i];
                    k++;   
                  }
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Neutral'){
            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['sent-it']!==undefined){
                  if(this.state.data[i].sentiment['sent-it'].sentiment==='neutral'){
                    temp[k]=this.state.data[i];
                    k++;   
                  }         
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Negative'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['sent-it']!==undefined){
                  if(this.state.data[i].sentiment['sent-it'].sentiment==='negative')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }
          }
 
          //Category Feel-it
         
        }else if(this.state.flagType===2 || this.state.flagType==='2'){

          if (this.state.flagSentiment==='All'){
            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  temp[k]=this.state.data[i];
                  k++;   
                }
             }
            i++;
          }
          }else if(this.state.flagSentiment==='Positive'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].sentiment==='positive')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Neutral'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].sentiment==='neutral')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Negative'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].sentiment==='negative')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Joy'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].emotion==='joy')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Sadness'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].emotion==='sadness')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Anger'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].emotion==='anger')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }else if(this.state.flagSentiment==='Fear'){

            while(i<this.state.data.length){
              if(this.state.data[i].sentiment!==undefined){
                if(this.state.data[i].sentiment['feel-it']!==undefined){
                  if(this.state.data[i].sentiment['feel-it'].emotion==='fear')
                  {
                    temp[k]=this.state.data[i];
                    k++;   
                  }          
                }
              }
              i++;
            }

          }

      }else{ //HATE SPEECH IT

        if(this.state.flagSentiment==='All'){
          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
              if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                temp[k]=this.state.data[i];
                k++;   
              }
            }
          i++;
          }
        }else if(this.state.flagSentiment==='Acceptable'){
          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
              if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='acceptable')
                {
                  temp[k]=this.state.data[i];
                  k++;   
                }          
              }
            }
            i++;
          }
        }else if(this.state.flagSentiment==='Inappropriate'){
          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
              if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='inappropriate')
                {
                  temp[k]=this.state.data[i];
                  k++;   
                }          
              }
            }
            i++;
          }
        }else if(this.state.flagSentiment==='Offensive'){
          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
              if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='offensive')
                {
                  temp[k]=this.state.data[i];
                  k++;   
                }          
              }
            }
            i++;
          }
        }else if(this.state.flagSentiment==='Violent'){
          while(i<this.state.data.length){
            if(this.state.data[i].sentiment!==undefined){
              if(this.state.data[i].sentiment['hate_speech_it']!==undefined){
                if(this.state.data[i].sentiment['hate_speech_it'].hate_speech_level==='violent')
                {
                  temp[k]=this.state.data[i];
                  k++;   
                }          
              }
            }
            i++;
          }
        }
          

      }
      
      this.state.data = temp
      this.handleQuery();

    } //end
    
      


   
      //QUERY SECTIOn

      handleQuery = () =>{
        if(this.state.data.length===0){
          
          this.state.totalTweets=0
          this.query()
          
        }else{
          
          this.state.totalTweets=this.state.data.length
          this.query()
        }
      }

      query = () =>{
        this.props.parentCallback(this.state.data);
      }
      

        createOption = (sel, text, value) =>{
          var opt = document.createElement('option');
          opt.value = value;
          opt.text = text;
          sel.options.add(opt);
        }

      configureDropDownLists = (ddl1, ddl2) =>{
          
          var all = ["All","Positive", "Neutral", "Negative", "Joy", "Sadness", "Anger", "Fear", "Acceptable", "Inappropriate", "Offensive", "Violent"];
          var sent_it = ["All","Positive", "Neutral", "Negative"];
          var feel_it = ["All","Positive", "Neutral", "Negative", "Joy", "Sadness", "Anger", "Fear"];
          var hate_speech_it = ["All","Acceptable", "Inappropriate", "Offensive", "Violent"];

          var i = 0;
          
          switch (ddl1.value) {
            case '0':
              ddl2.options.length = 0;
              for (i = 0; i < all.length; i++) {
                this.createOption(ddl2, all[i], all[i]);
              }
              break;
            case '1':
              ddl2.options.length = 0;
              for (i = 0; i < sent_it.length; i++) {
                this.createOption(ddl2, sent_it[i], sent_it[i]);
              }
              break;
            case '2':
              ddl2.options.length = 0;
              for (i = 0; i < feel_it.length; i++) {
                this.createOption(ddl2, feel_it[i], feel_it[i]);
              }
              break;
            case  '3':
                ddl2.options.length = 0;
                for (i = 0; i < hate_speech_it.length; i++) {
                  this.createOption(ddl2, hate_speech_it[i], hate_speech_it[i]);
                }
              break;
            
            default:
              ddl2.options.length = 0;
              break;
          }
          this.resetCategory2(ddl1);
          this.handleCategory2(ddl1);
        
        }

        resetCategory2 = (ddl1) =>{
          this.state.flagType = ddl1.value;
          this.state.flagSentiment = "All";
          this.state.data = this.state.oldData
          this.filterByCategory();
          
        }
        
        handleCategory2 = (ddl1) =>{
          if(this.state.flagType!=="0" && this.state.flagSentiment!=="All"){
            this.state.flagType = ddl1.value ;  
            this.state.data = this.state.oldData;
            this.resetFilter();
            this.filterByCategory();
          }else if(ddl1.value==="0" && this.state.flagSentiment==="All"){
            
            this.state.flagType = ddl1.value ; 
            this.state.data = this.state.oldData;
            this.resetFilter();
            
          }else{
            this.state.flagType = ddl1.value ;  
            this.filterByCategory();     
          }
        }

        handleSentiment2 = (event) => {
          if(this.state.flagType!=="0" && this.state.flagSentiment!=="All"){
            this.state.flagSentiment = event.target.value ; 
            this.state.data = this.state.oldData;
            this.resetFilter();
            this.filterByCategory();
          }else if(this.state.flagType=="0" && event.target.value=="All"){
           
            this.state.flagSentiment = event.target.value ; 
            this.state.data = this.state.oldData;
            this.resetFilter();
           
          }else{
            this.state.flagSentiment = event.target.value ;  
            this.filterByCategory();     
          } 
          
        }
    
    
    render(){

        
        return(      
          <>      
        
        <div className="row stat-cards">

        <script>
        </script>

        <div className="col-md-4 col-xl-4">
                <article className="stat-cards-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="stat-cards-info">
                        <center><h4>Algorithm</h4><br />
                          <select id="ddl1" onChange={()=>this.configureDropDownLists(document.getElementById('ddl1'),document.getElementById('ddl2'))}>

                            <option value="0">All</option>
                            <option value="1">Sent-it</option>
                            <option value="2">Feel-it</option>
                            <option value="3">Hate-speech-it</option>

                          </select>

                        </center>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="stat-cards-info">
                        <center><h4>Sentiment</h4><br />
                          <select id="ddl2" onChange={this.handleSentiment2}>
                            <option value="All">All</option>
                            <option value="Positive">Positive</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Negative">Negative</option>
                            <option value="Joy">Joy</option>
                            <option value="Sadness">Sadness</option>
                            <option value="Anger">Anger</option>
                            <option value="Fear">Fear</option>
                            <option value="Acceptable">Acceptable</option>
                            <option value="Inappropriate">Inappropriate</option>
                            <option value="Offensive">Offensive</option>
                            <option value="Violent">Violent</option>


                          </select>

                        </center>
                      </div>
                    </div>


                  </div>

                </article>
              </div>


        <div className="col-auto col-auto">
                <article className="stat-cards-item">
                  <div className="row">
                    <div className="col-auto col-auto">
                      <div className="stat-cards-info">
                      <center><h4>Genre</h4><br />
                          <select id="sel1" onChange={this.handleGenre} >
                            <option value="0">All</option>
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

        <div className="col-md-4 col-xl-4">
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
                  <SearchText parentCallback = {this.handleText.bind(this)} db = {this.props.db}  allText = {this.props.tweetsData.dataText}/>
                    
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
      </>)
    }
}

export default Filters