document.addEventListener("DOMContentLoaded", function(){

    const quotesURL = "http://localhost:3000/quotes?_embed=likes"
    const theForm = document.querySelector("#new-quote-form")

    function fetchQuotes(){
        return fetch(quotesURL)
        .then(function(response){
            return response.json()
        })
    }

    function renderQuotes(){
        fetchQuotes()
        .then(function(quotes){
            for (let i = 0; i < quotes.length; i++ )
            {renderQuote(quotes[i])}
        })
    }

    function renderQuote(quote){
        const theUl = document.querySelector("#quote-list")
        const theLi = document.createElement("li")
        theLi.className = "quote-card"
        const theBlockQuote = document.createElement("blockquote")
        theBlockQuote.className = "blockquote"
        const theP = document.createElement("p")
        theP.className = "mb-0"
        theP.innerText = quote.quote
        const theFooter = document.createElement("footer")
        theFooter.className = "blockquote-footer"
        theFooter.innerText = quote.author
        const theBr = document.createElement("br")
        const likesBtn = document.createElement("button")
        likesBtn.className = "btn-success"
        likesBtn.innerText = "Likes:"
        const theSpan = document.createElement("span")
        theSpan.innerText = quote.likes.length
        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        likesBtn.appendChild(theSpan)
        theBlockQuote.append(theP, theFooter, theBr, likesBtn, deleteBtn)
        theLi.appendChild(theBlockQuote)
        theUl.appendChild(theLi)
        deleteBtn.addEventListener("click", function(e){
            theLi.remove()
            deleteForm(quote)
        })
    }

        theForm.addEventListener("submit", function(e){
            e.preventDefault()
            const newQuote = e.target[0].value
            const newAuthor = e.target[1].value
            const postQuote = {quote: newQuote, author: newAuthor}
            postForm(postQuote)
        })


    function postForm(postQuote){
        const configObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(postQuote)
        }
        fetch("http://localhost:3000/quotes", configObj)
        .then(function(response){
            return response.json()
        }).then(function(response){
            document.querySelector("#quote-list").innerHTML = " "
            renderQuotes()
        })
    }

    function deleteForm(quote){
        const configObj = {
            method: "DELETE",
        }
        fetch(`http://localhost:3000/quotes/${quote.id}`, configObj)
        .then(function(response){
            return response.json()
        })
    }

    renderQuotes()
})