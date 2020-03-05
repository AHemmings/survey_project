document.addEventListener('DOMContentLoaded', () => {
    //select the buttons defined in edit survey_questions
    const toggle_button = document.querySelector("button.toggle_free_fixed")
    const div_edit_question = document.querySelector("div.div_edit_question")
    const question =div_edit_question.getAttribute("question")
    const options =  JSON.parse( div_edit_question.getAttribute("options") )
    console.log( div_edit_question.getAttribute("options") )
    const buttonMoreExist = document.querySelector("button.moreOptions") 

    //here we check if the button add more already exist, if so we want to give the option to the user to add more options
    if(buttonMoreExist){
        
        addMore(buttonMoreExist)
    }
    
    //add event listerner to the button 
    toggle_button.addEventListener("click", e => {
        e.preventDefault()
        if(toggle_button.innerHTML.includes("free")){
            console.log(toggle_button.innerHTML)
            toggle_button.innerHTML = "Expect fixed response?"
            div_edit_question.innerHTML = `
              <label>Question for free response</label>
              <textarea name="survey_question[questions][question]" placeholder="Enter your question here" >${question}</textarea>
            
            `
              //change the name of the select tag
              document.querySelector("select.mySelect").name="survey_question[questions][order]"

            //hide the add more button if the user is trying to create a question for a free response
            if(document.querySelector("button.moreOptions")){
                 document.querySelector("button.moreOptions").style.display = "none"
            }

           if( document.querySelector("div.optionContainer") ){
            document.querySelector("div.optionContainer").innerHTML = ""
           }

        }else{
            // if(document.querySelector("button.moreOptions")){
            //     document.querySelector("button.moreOptions").style.display = "block"
            //     document.querySelector("button.moreOptions").classList.add("waves-effect","waves-light","btn","blue","col","s2","right")

            // }else{
                const newBtn = document.createElement("button")
                newBtn.innerHTML = "More options"
                newBtn.classList.add("moreOptions","waves-effect","waves-light","btn","blue","right")
                document.querySelector("div.buttonHolder").appendChild(newBtn)
                addMore(newBtn)
                
            //}
            toggle_button.innerHTML = "Expect free response?"
            div_edit_question.innerHTML = `
                    <label class="labelForFixed">Question for fixed response</label>
                    <textarea placeholder="Enter your question here" name="survey_question[questions1][question]" >${question}</textarea> 
                      
                    `
                    //change the name of the select tag
                    document.querySelector("select.mySelect").name="survey_question[questions1][order]"
            if(options && options.length > 0){
              
                    options.forEach(e =>{
                        div_edit_question.innerHTML += `
                                <input  name='survey_question[questions1][options][${e.id}]' value=${e.option_text} >
                        `
                    })
            }else{
                div_edit_question.innerHTML += `
                    <input  name='survey_question[questions1][options][new][]' placeholder="Enter a possible answer" >
                `
                
            }
           
            //create a button More option if it did not exist
            if(!buttonMoreExist && !document.querySelector("button.moreOptions")){
                const newBtn = document.createElement("button")
                newBtn.innerHTML = "More options"
                newBtn.classList.add("moreOptions")
                document.querySelector("div.buttonHolder").appendChild(newBtn)
                
                addMore(newBtn)
            }
          
        }
       
    })


//addMore function
    function addMore(moreButton){
      //add event to the button
      moreButton.addEventListener("click",e =>{
          e.preventDefault()
    
          //create a new div to host the new input
          const newDiv = document.createElement("div")
          newDiv.classList.add("newDiv")
          newDiv.classList.add("row")
    
          //create new input for options
          new_input = document.createElement("input")
          new_input.name='survey_question[questions1][options][new][]' 
          new_input.placeholder = "Enter a possible answer" 
          new_input.classList.add("col","s11")
    
          //create a span for deletion of added fields
          const span_2X = document.createElement("span")
          span_2X.innerHTML =  `<i class="tiny material-icons center">clear</i>`
          span_2X.classList.add("col","s1")
          span_2X.style.padding = "20px"
          span_2X.addEventListener("click", () => {
            span_2X.parentNode.remove()
          })
      
          //put everything together
          newDiv.appendChild(new_input)
          newDiv.appendChild(span_2X)
          document.querySelector("div.optionContainer").appendChild(newDiv)
    
        
      })
    }

 

})



  