document.addEventListener('DOMContentLoaded', () => {
    const free_button = document.querySelector("button.free")
    const fixed_button = document.querySelector("button.fixed")
    if(free_button && fixed_button){

            //add event to free_button

            free_button.addEventListener("click", e => {
                e.preventDefault()
                const questionContainer = document.querySelector("div.questionContainer")
                questionContainer.innerHTML = `
                <label>Question for free response</label>
                <textarea name="survey_question[questions][question]" placeholder="Enter your question here"></textarea>`

                //change the name of the select tag
                document.querySelector("select.mySelect").name="survey_question[questions][order]"


            }) 


            //add event to fixed_button
            fixed_button.addEventListener("click", e => {
                e.preventDefault()
                const questionContainer = document.querySelector("div.questionContainer")
                questionContainer.innerHTML = `
                    <label class="labelForFixed">Question for fixed response</label>
                    <textarea placeholder="Enter your question here" name="survey_question[questions1][question]"></textarea>    
                    <div class="optionContainer">
                        <div class="optionInputDiv row"> <input type="text" placeholder="Enter a possible answer" name="survey_question[questions1][options][]" /></div>
                    </div>  
                    <button class="moreOption">More option</button>  
                ` 
                //change the name of the select tag
                document.querySelector("select.mySelect").name="survey_question[questions1][order]"


                //let's select the button for more option
                const more_button = document.querySelector("button.moreOption")
                more_button.classList.add("waves-effect","waves-light","btn","blue","col","s2")
                more_button.addEventListener("click", e=> {
                    e.preventDefault()
                    //create a span for deletion of unessary fields
                    const span_3X = document.createElement("span")
                    span_3X.innerHTML =   `<i class="tiny material-icons center">clear</i>`
                    span_3X.classList.add("col","s1")
                    span_3X.style.padding = "20px"
                    span_3X.addEventListener("click", () => {
                    span_3X.parentNode.remove()
                    })
                    //create a new input on click
                    const div_input = document.createElement("div")
                    div_input.classList.add("optionInputDiv")
                    const new_input = document.createElement("input")
                    new_input.placeholder = "Enter a possible answer"
                    new_input.name="survey_question[questions1][options][]"
                    new_input.classList.add("col","s10")

                    div_input.appendChild(new_input)
                    div_input.appendChild(span_3X)
                    
                    document.querySelector("div.optionContainer").appendChild(div_input)

                })
            })
    }
})

  