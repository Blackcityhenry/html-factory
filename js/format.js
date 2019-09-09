var format = new Vue(
  {
    el: '#app',
    vuetify: new Vuetify(
      {
        theme: {
          dark: true
        }
      }
    ),
    data: {
      input: '',
      actions: [],
      options: ['minify', 'encoding'],
      doneSnack: false,
      emptySnack: false,
      noactSnack: false
    },
    methods: {
      format() {
        if( !this.input.length ){
          this.emptySnack = true
        }
        else if ( !this.actions.length ){
          this.noactSnack = true
        }
        else {
          if ( this.actions.includes('encoding') ){
            this.input = this.input.replace(/</g,'&lt;')
          }

          if ( this.actions.includes('minify') ){
            this.input = this.input.replace(/\s{2,}/g,' ')
            this.input = this.input.replace(/\n/g,'')
          }

          this.doneSnack = true
        }
      }
    }
  }
)

new ClipboardJS('.js-clip');
