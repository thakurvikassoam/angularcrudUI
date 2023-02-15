import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { FormGroup, FormControl, Validators} from '@angular/forms';
      
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
       
  id!: number;
  post!: Post;
  form!: FormGroup;
  EmplemployeeID=0;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  
  ngOnInit(): void {

    this.id = this.route.snapshot.params['postId'];
    this.EmplemployeeID=this.id;
    alert(this.EmplemployeeID);
    this.postService.find(this.id).subscribe((data: Post)=>{
      this.post = data;
    }); 
       
    this.form = new FormGroup({
      employeeID: new FormControl('', [Validators.required]),
      EmployeeName: new FormControl('', [Validators.required]),
      FatherName: new FormControl('', Validators.required),
      Department:new FormControl(),
      EmailId:new FormControl(),      
      DOJ:new FormControl()
    });
    
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    debugger;
    console.log(this.form.value);
    this.postService.update(this.form.value).subscribe((res:any) => {      
         console.log('Post updated successfully!');
         this.router.navigateByUrl('post/index');
    })
    alert('updated successfully!');
  }
    
}