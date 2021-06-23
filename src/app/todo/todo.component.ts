import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoList : any[]
  cache_key :string;
  constructor() { 

    
  }

  ngOnInit(): void {
    const cache_key = 'todoList';
    this.todoList =  []
    const data = JSON.parse(localStorage[this.cache_key])
    data.forEach(element => {
      this.todoList.push([element[0],element[1]])
    });
  }

  onAdd(title){

    if(title.value == ""){
      alert("Please write something!")
      return
    }


    var isPresent = false;
    this.todoList.forEach(element => {
      if(element[0] == title.value){
        alert("Item already in List!")
        isPresent = true
      }
    });
    if(!isPresent){
      this.todoList.push([title.value,false])
      localStorage[this.cache_key] = JSON.stringify(this.todoList);
      this.todoList.sort(function(a,b) {
        return a[1]-b[1]
      });
      title.value = null
    }
    
  }

  alterCheck(title){
    this.todoList.forEach(element => {
      if(element[0] == title){
        element[1] = !element[1]
      }
    });
    this.todoList.sort(function(a,b) {
      return a[1]-b[1]
    });
    localStorage[this.cache_key] = JSON.stringify(this.todoList);
  }

  onDelete(title){
    var index  = 0
    this.todoList.forEach(element => {
      if(element[0] == title){
        this.todoList.splice(index,1)
        return
      }
      index ++
    });
    localStorage[this.cache_key] = JSON.stringify(this.todoList);
  }



  
}
