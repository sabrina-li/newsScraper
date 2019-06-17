document.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#scrape").addEventListener('click', function() {
        this.innerHTML = "<div class=\"loader\"></div>";
        const request = new XMLHttpRequest();
        request.open('GET', '/api/scrape', true)
            request.onload = function () {
            // Begin accessing JSON data here
                if(this.status === 200){
                    //Show notification for scrap complete
                    location.reload();
                }else{
                    //TODO show error
                }
            }
        request.send();
    }, false);

    const noteRemoveButtons = document.querySelectorAll(".removeNote")
    noteRemoveButtons.forEach(button=>{
        button.addEventListener('click', function() {
            this.innerHTML = "<div class=\"loader\"></div>";
            const request = new XMLHttpRequest();
            const noteID = this.getAttribute('data-noteid');
            const articleID = this.getAttribute('data-articleid');
            request.open('DELETE', '/api/'+articleID+'/'+noteID, true)
                request.onload = function () {
                    console.log(this.status);
                // Begin accessing JSON data here
                    if(this.status === 200){
                        //Show notification for scrap complete
                        location.reload();
                    }else{
                        //TODO show error
                    }
                }
            request.send();
        }, false);
        
    })
  });