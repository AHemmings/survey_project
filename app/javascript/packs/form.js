
document.addEventListener('DOMContentLoaded', () => {
  //this is a span to delete the added field
   

    const add_button = document.querySelector("button.add_question")
    if(add_button){
    add_button.addEventListener("click", (event) => {
      const span_X = document.createElement("span")
      span_X.innerHTML = "X"
      span_X.addEventListener("click", () => {
        span_X.parentNode.remove()
      })
      event.preventDefault()
      //when the button is clicked, we will create a div with the two choices for the new question
      const div_question =  document.createElement("div") 
      div_question.classList.add("question")

      //creation of actual div for actual question content
      const div_content =  document.createElement("div") 
      div_content.classList.add("questionContent")

      //creation of button for fixed response
      const fixed_button = document.createElement("button")
      fixed_button.innerHTML = "Fixed Response"

     
      //creation of button for free response
      const free_button = document.createElement("button")
      free_button.innerHTML = "Free Response"
      

       //addEvent to fixed and free button 
       free_button.addEventListener("click", e => {
         e.preventDefault()

         if(free_button.classList.contains("active")){
          fixed_button.classList.remove("active")
          free_button.classList.add("active")

         }

         div_content.innerHTML= `
         <label>Question for free response</label>
        <div class="mySelect">Order: <select class="mySelect" name="survey[questions][][question][order]"></select></div> <textarea name="survey[questions][][question][content]" placeholder="Enter your question here"></textarea>`
       select()

       })
       fixed_button.addEventListener("click", e => {
        e.preventDefault()

        if(fixed_button.classList.contains("active")){
          free_button.classList.remove("active")
           fixed_button.classList.add("active")
          
        }
        // here we define a num to be able to associate each option to its question
        // const num = document.querySelectorAll("label.labelForFixed").length + 1
        div_content.innerHTML = `
        <label class="labelForFixed">Question for fixed response</label>
        <div class="mySelect">Order: <select class="mySelect" name="survey[questions1][][question][order]"></select></div> <textarea placeholder="Enter your question here" name="survey[questions1][][question][content]"></textarea>    
        <div class="optionContainer">
         <div class="optionInputDiv"> <input type="text" placeholder="Enter a possible answer" name="survey[questions1][][question][question_options][]" /> </div>
        </div>    
        `
        select()

        //creation of the option button
        const option_button = document.createElement("button")
        option_button.innerText="More Option"
        option_button.classList.add("addOption")

        // addEvent to the option button
        option_button.addEventListener("click", e => {
          e.preventDefault()
        //create new span for deletion
        const span_2X = document.createElement("span")
        span_2X.innerHTML = "X"
        span_2X.addEventListener("click", () => {
          span_2X.parentNode.remove()
        })

          const optionContainer = document.querySelectorAll("div.optionContainer")[document.querySelectorAll("div.optionContainer").length - 1]

        
        const new_input = document.createElement("input")
        new_input.placeholder = "Enter a possible answer"
        new_input.name="survey[questions1][][question][question_options][]"

        const input_div = document.createElement("div")
          input_div.classList.add("optionInputDiv")

        input_div.appendChild(new_input)
        input_div.appendChild(span_2X)
        optionContainer.appendChild(input_div)
          
        })
        div_content.appendChild(option_button)        


      })

      //select feature 
      function select(){
        const selects = document.querySelectorAll("select.mySelect")
        if(selects){
          //declare a variable i to be used in the nested forEach
           let i = 0
           //declare a variable j to be able to tell which option should be selected on each select
           let j = 0
           

          //This for each is to clear all the innerHTML of existing selects
          selects.forEach(e => e.innerHTML = "")

          // A nested forEach let us add option depending on 
         selects.forEach(e => {
           
           selects.forEach(e=> {
             console.log("this is the indexOf")
             
             const opt = document.createElement("option")
             opt.value = i + 1
             opt.innerHTML = i+1
  
             e.appendChild(opt)
             
           }) 

           e.querySelectorAll("option").forEach(option =>{
             // if j === i means that the index of the option is the same as the index of the select
             // therefore that option should be selected by default
              if(j === i){
                option.selected = true
              } 
           })
               i +=1
               j +=1
             


         })
            
         
        }
      }

      // append the divs
     const container=  document.querySelector("div.questionContainer")
     div_question.appendChild(fixed_button)
     div_question.appendChild(free_button)
     div_question.appendChild(span_X)
     div_question.appendChild(div_content)
      container.appendChild(div_question)
    

    })
  }
})
