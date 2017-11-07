import './css/index.css'
import Vue from 'vue'
var filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter((todo)=>{
        return !todo.completed
      })
  },
  completed(todos) {
    return todos.filter((todo)=>{
        return todo.completed
      })
  }
}
let app = new Vue({
  el: ".todoapp",
  data: {
    msg: "Hello World",
    title: 'todos',
    newTodo: '',
    todos: [{
      content: 'vue',
      completed: false
    },{
      content: "vuex",
      completed: false
    }],
    editedTodo: null,
    editCache: null,
    hashName: 'all'
  },
  computed: {
    remain() {
      return filters.active(this.todos).length
    },
    isAll: {
      get() {
        return this.remain === 0
      },
      set(value) {
        this.todos.forEach((todo)=>{
          todo.completed = value
        })
      }
    },
    filteredTodos(){
      return filters[this.hashName](this.todos)
    }
  },
  filters: {
    series: function(n){
        return n == 1 ? 'item' : 'items'
    }
  },
  methods: {
    addTodo(e) {
      console.log(e.target.value);
      if(!this.newTodo){
        return
      }
      this.todos.push({
        content: this.newTodo,
        completed: false
      });
      this.newTodo = '';
    },
    removeTodo(todo){
      this.todos.splice(this.todos.indexOf(todo),1);
    },
    editTodo(todo){
      this.editCache = todo.content;
      this.editedTodo = todo;
    },
    doneEdit(todo){
      this.editedTodo = null;
      if(!todo.content){
        this.removeTodo(todo);
      }
    },
    cancelEdit(todo){
      // 加一个缓存
      this.editedTodo = null;
      todo.content = this.editCache;
    },
    clear(){
      this.todos = filters.active(this.todos);
    }
  },
  // 自定义指令
  directives: {
    todoFocus(el,value){
      if(value){
        el.focus();
      }
    }
  }
});
function hashChange(){
  let hashName = location.hash.replace(/#\/?/,'');
  if(filters[hashName]){
    app.hashName = hashName;
  }else{
    location.hash = ''
    app.hashName = 'all'
  }
}
window.addEventListener("hashchange",hashChange);
hashChange();
//new Vue({
//  el: ".info"
//})
