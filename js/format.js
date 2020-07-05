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
      options: ['minify', 'encoding','indent'],
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
            this.input = this.input.replace(/\n/g,'')
            this.input = this.input.replace(/\s{2,}/g,' ')
            this.input = this.input.replace(/>\s+</g,'><')
          }

          if ( this.actions.includes('indent') ){
            var row = this.input.split(/\n/g)
            var space = []
            for (var i = 0, n = 0; i < row.length; i++){
              if ( /^\s*$/.test(row[i]) ) {
                continue
              }
              space[n] = row[i].match(/^\s*/)
              space[n] = space[n][0].length
              n++
            }
            var min = Math.min(...space)
            var regex = new RegExp('^\\s{'+ min +'}', 'g')

            for (var i = 0; i < row.length; i++){
              row[i] = row[i].replace(regex , '')
            }

            this.input = row.join('\n')
          }

          this.copyToClipboard();
        }
      },
      copyToClipboard(){
        var target = this.$refs.inputText.$el.querySelector('textarea');

        target.value = this.input;

        target.select();

        document.execCommand("copy");

        this.doneSnack = true
      }
    },
    mounted(){
      window.addEventListener('keyup', function(event) {
        if (event.ctrlKey && event.keyCode == 13) {
          console.error('fired ctrl');
        }
      });
    }
  }
)
