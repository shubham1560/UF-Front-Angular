import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Tuts {
  heading: string,
  imageUrl: string,
  text: string,
  id: number
}

@Component({
  selector: 'app-using-the-editor',
  templateUrl: './using-the-editor.component.html',
  styleUrls: ['./using-the-editor.component.scss']
})
export class UsingTheEditorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UsingTheEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  selectedFeature

  ngOnInit(): void {
    this.editorFeatures = this.sortedFeatures();
    this.selectedFeature = this.editorFeatures[0]
    if (this.data?.dialog) {
      this.becomeAnAuthor()
      this.editorFeatures = undefined;
    }
  }


  becomeAnAuthor() {
    this.selectedFeature = {
      id: 1,
      heading: "Becoming an author",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/become-author.gif",
      text: "To become an author: <ul><li> Profile -> My Profile -> Become an author</li><ul>"
    }
  }


  editorFeatures: Tuts[] = [
    {
      id: 1,
      heading: "Adding a title",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/title.gif",
      text: "Please give a meaningful title to help users!"
    },
    {
      id: 3,
      heading: "Adding a paragraph",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/paragraph.gif",
      text: "You can click on the screen and just start typing to add a paragraph!"
    },
    {
      id: 4,
      heading: "Text style change (bold, italic)",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/text-style.gif",
      text: "Just select the text you want to make changes to it's style, you can change the type too in menu!"
    },
    {
      id: 5,
      heading: "Adding  a hyperlink",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/hyperlink.gif",
      text: "Select the text and select the Link menu"
    },
    {
      id: 2,
      heading: "Adding a heading",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/heading.gif",
      text: "Press [TAB] and select [H] menu item to add heading, you can also select the type of heading on pressing [TAB] again"
    },
    {
      id: 6,
      heading: "Adding a list",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/list.gif",
      text: "Press [TAB] and select list to add list to the article"
    },
    {
      id: 7,
      heading: "Adding program code(python or any other language)",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/code.gif",
      text: "Sometime you may write code to get the point better to the user!"
    },
    {
      id: 8,
      heading: "Adding raw html",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/raw-html.gif",
      text: "Some things can't be done by the editor, so the raw html is given <br> <ul> <li>Making nested lists</li> </ul>"
    },
    {
      id: 10,
      heading: "Previewing the article",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/preview-article.gif",
      text: "You can always preview how the article will look to the user by clicking in the title in header!"
    },
    {
      id: 9,
      heading: "Deleting an element",
      imageUrl: "https://sortedtree.s3.ap-south-1.amazonaws.com/gifs-editor-tutorial/delete.gif",
      text: "You can delete the element you don't want"
    }

  ]

  sortedFeatures() {
    return this.editorFeatures.sort(function (a, b) { return a.id - b.id });
  }

  selectFeature(id) {
    this.editorFeatures.forEach(element => {
      if (element.id == id) {
        this.selectedFeature = element;
      }
    });
  }


}
