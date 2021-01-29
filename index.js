let timer        = -1
const queue      = []
const allProcess = [
  { id: 1, arrival: 0, burst: 3, ratio: 0 },
  { id: 2, arrival: 2, burst: 7, ratio: 0 },
  { id: 3, arrival: 4, burst: 5, ratio: 0 },
  { id: 4, arrival: 6, burst: 2, ratio: 0 },
  { id: 5, arrival: 8, burst: 4, ratio: 0 }
]
let processing   = undefined
let timerActual  = 0
let next         = -1
let timerNext    = 0

const execution = () => {
    timer++

    for (const process of allProcess) {
        if (process.arrival === timer) {
            queue.push(process)
            console.log(`Adicionado p${process.id} na fila`)
        }
    }
    
    if (!processing) {
        if (queue.length === 1) {
            processing = queue[0]
            timerActual = queue[0].burst + timer
    
            console.log(`SELECIONADO p${processing.id} =>`, processing)
            queue.splice(0, 1)
        }

        if (queue.length > 1) {
            next = { ratio: -1 }

            for (const item of queue) {
                const responseRatio = (timer - item.arrival) / item.arrival
        
                item.ratio = responseRatio
        
                if (responseRatio > next.ratio) {
                    next      = item
                    timerNext = item.burst + timer
        
                    console.info(`SELECIONADO p${next.id} =>`, next)
                }
            }

            processing  = next
            timerActual = timerNext
        }
    }

  if (processing) {
    if (timerActual === timer) {
        for (const [index, item] of queue.entries()) {
            if (item.id === processing.id) {
                queue.splice(index, 1)
            }
        }

        processing = undefined

    } else {
        console.log(`Processando p${processing.id}`)
    }
  } else {
    console.log(`Nenhum processo!`)
  }
}

setInterval(execution, 1000)