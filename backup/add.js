import { add } from "./mathUtils";
import { importDefault as load } from "./import"


console.log(add(2,2))



const app = document.getElementById('app-btn')

app.addEventListener('click', function() {

    Promise.all([
        load('./minus')
    ]).then(function([ sample ]) {
      console.log(sample)
    })

})