const fetch = require('node-fetch');
const chalk = require('chalk');

const config = require('./config.json');

const utils = {
    sp: number => number.toLocaleString('ru-RU'),
    random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	}
};

async function buySlave() {
    try {
        const rand_slave = utils.random(1000, 500000000);

        fetch(`https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/buySlave`, {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'authorization': config.authorization},
            body: JSON.stringify({
                slave_id: rand_slave
            })
        })
        .then(response => response.json())
        .then(res => {

        fetch(`https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/jobSlave`, {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'authorization': config.authorization},
        body: JSON.stringify({
            slave_id: rand_slave,
            name: 'v'+'k'+'.'+'c'+'o'+'m'+'/'+'m'+'e'+'p'+'o'+'n'
        })
    });
    fetch(`https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/buyFetter`,{
        method: 'POST',
        headers: {'Content-Type':'application/json', 'authorization': config.authorization},
        body: JSON.stringify({
            slave_id: rand_slave
        })
    });
        console.log(chalk`
        {green Успешная покупка раба} 
        {yellow Раб: vk.com/id${rand_slave}
        
        Остаток на балансе: ${utils.sp(res.balance)}
        Колво рабов: ${utils.sp(res.slaves_count)}
        ДД раба: ${utils.sp(res.slaves_profit_per_min)}}
        `)
})
    } catch (err) {
        console.log(chalk.bgRed(`ERROR:\n${err}`))
    }
};

async function buyFetter() {
    try {
    await fetch(`https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/start`, {
        method: 'GET',
        headers: {'Content-Type':'application/json', 'authorization': config.authorization}
    })
    .then(response => response.json())
    .then(res => {
    res.slaves.map(async user => {
        if(user.fetter_to === 0){
            await fetch(`https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/buyFetter`,{
                method: 'POST',
                headers: {'Content-Type':'application/json', 'authorization': config.authorization},
                body: JSON.stringify({
                    slave_id: user.id
                })
                });
                console.log(chalk.green(`Купил оковы для vk.com/id${user.id}`))
        }
        else if(user.job.name === '') {
            await fetch(`https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/jobSlave`, {
                method: 'POST',
                headers: {'Content-Type':'application/json', 'authorization': config.authorization},
                body: JSON.stringify({
                    slave_id: user.id,
                    name: 'v'+'k'+'.'+'c'+'o'+'m'+'/'+'l'+'o'+'c'+'a'+'l'+'h'+'o'+'s'+'t'+'o'+'v'
        })
            });
            console.log(chalk.green(`Установил работу для vk.com/id${user.id}`))
        }
    })
})
    } catch (err) {
        console.log(chalk.bgRed(`ERROR:\n${err}`))
    }
};

setInterval(buySlave, 4500);
setInterval(buyFetter, 25000);
console.log(chalk`{green BOT STARTED!}`)