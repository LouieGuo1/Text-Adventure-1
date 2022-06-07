const textElement = document.getElementById('text')

const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() { 
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
//textNodes is an array of objects
//The find() method returns the value of the first element that passes a test.
//The find() method executes a function for each array element.

  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  console.log(optionButtonsElement.firstChild)
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are a Knight that recieved a mission to slay a monster lurking in the magical forest.',
    options: [
      {
        text: 'Put on your equipment and fight the monster.',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Talk to the Hero that tamed a dragon.',
        nextText: 8
      }
    ]
  },
  {
    id: 2,
    text: 'You decide to fight the monster with your party.',
    options: [
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Have the mage in your party attack it with the most powerful spell: EXPLOSION',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Have the sniper in your party shoot it with his sniper.',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After you and your party attack it, the monster got angry and is going to attack.',
    options: [
      {
        text: 'You use your shield to block.',
        nextText: 4
      },
      {
        text: 'The mage, in your party, uses a spell, divine barrier, to protect you, but it gets angry at the mage for it and kills the mage.',
        nextText: 5
      },
      {
        text: 'The sacrifice yourself to buy time for the sniper and mage to unleash their most powerful attacks.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'The shield broke and you died',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'The mage dies and it is just you and the sniper left in your party.',
    options: [
      {
        text: 'Continue',
        nextText: 6
      },
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'When the mage was being killed, it brought time for the sniper to use his most powerful attack: Piercing Typhoon shot. The monster tries to block but its arms and legs were torned off from the sniper.',
    options: [
      {
        text: 'You quickly go in to slice off the monster head with your sword, but the monster shot laser out of its eyes.',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'The laser melted your body and you died. The sniper does not have a weapon because the Piercing Typhoon shot had a drawback, which broke his weapon.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'The Hero lets you borrow his dragon.',
    options: [
      {
        text: 'You borrow it until you finish the mission.',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'You encounter the monster',
    options: [
      {
        text: 'Attack it with your dragon.',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'The dragon burns the monster with its flamethrower attack.',
    options: [
      {
        text: 'The monster is defeated with the help of the dragon and you completed the mission!',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'You and your party use the money you earned from this mission and threw a party.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()