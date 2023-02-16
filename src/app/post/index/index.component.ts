import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
       
@Component({
  selector: 'app-index',
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
       
  posts: Post[] = [];
  Ids:number[]=[];
  show:boolean=false;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: PostService) { }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    debugger;
    this.postService.getAll().subscribe((data: Post[])=>{      
      this.posts = data;
      console.log(this.posts);
    })  
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  // let srs: string = '';
  // let checked: boolean = false;
  // items.forEach((element) => {
    
  //   if (element.isChecked && element.email != "") {
  //     checked = true;
  //     if (srs != '')
  //       srs += ',' + element.email;
  //     else
  //       srs = element.email;
  //   }
  // });
  sendEmail(items: any[]) {    
    let srs: string = '';
    let checked: boolean = false;
    items.forEach((element) => {
      
      if (element.isChecked && element.email != "") {
        checked = true;
        if (srs != '')
          srs += ',' + element.email;
        else
          srs = element.email;
      }
    });
   if (srs == '') {
      alert('Failed! Select row to send massage.');
    }
    else
    {
      
    }
  }
  
  deletePost(id:any){    
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.employeeID !== id);
         console.log('deleted successfully!');
         alert('deleted successfully!');
    })
  }
SingleDelete(id:number){
this.Ids.push(id);
this.deletePost(this.Ids);
}

  Selectall(event:any)
  {
    debugger;
    if(event.target.checked){
      this.show=true;
this.posts.forEach(element=>{
  element.Checked=true;
  this.Ids.push(element.employeeID);
})

}
else{
  this.show=false;
  this.posts.forEach(element=>{
    element.Checked=false;
  })
  this.Ids=[];
}

  }
  singleselect(id:number,event:any){
    debugger;
 if(event.target.checked)
 {
  this.show=true;
  this.Ids.push(id);
 }
 else
 {
 
  this.Ids=this.Ids.filter(x=>x!=id);
  if(this.Ids.length==0){
    this.show=false;
  }
 }
  }
  DeleteSelected()
  {
    this.deletePost(this.Ids);

  }
}