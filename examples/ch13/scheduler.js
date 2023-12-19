import { createApp, defineComponent, h, hFragment }
    from 'https://unpkg.com/yaspa@5'

const NameComponent = defineComponent({
  onMounted() {
    console.log(`Component mounted with name: ${this.props.name}`)
  },
  render() {
    return h('p', {}, [this.props.name])
  },
})

const App = defineComponent({
  render() {
    return hFragment([
      h(NameComponent, { name: 'Alice' }),
      h(NameComponent, { name: 'Bob' }),
      h(NameComponent, { name: 'Charlie' }),
      h(NameComponent, { name: 'Diana' }),
      h(NameComponent, { name: 'Eve' }),
    ])
  },
})

createApp(App).mount(document.body)
