import React, {useState} from 'react';
import '../../App.css';
import ReactModal from 'react-modal';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

//For react-modal
ReactModal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: '1px solid #28547a',
    borderRadius: '4px'
  }
};
 
 function DeleteCommentModal(props) {
  console.log("props in delete modal..", props)
  const [showDeleteModal, setShowDeleteModal] = useState(props.isOpen);
  const [comment, setComment] = useState(props.deleteComment);

 console.log("comment", comment)
 console.log("inside delete modalll props.deleteComment", props.deleteComment);

 //const [deleteImage] = useMutation(queries.DELETE_IMAGES)

  /* const [deleteImage] = useMutation(queries.DELETE_IMAGES, {
    update(cache, { data: { deleteImage } }) {
        let userPostedImages = [];
        if (cache.readQuery({ query: queries.GET_USER_POSTED_IMAGES })) {
            userPostedImages = cache.readQuery({ query: queries.GET_USER_POSTED_IMAGES }).userPostedImages;

            console.log("asxcdx", userPostedImages);
        } else {
            userPostedImages = [];
            console.log("1233sdfrgf", userPostedImages);
        }

        console.log("blahhhhhh", userPostedImages);
        userPostedImages = userPostedImages?.filter((image) => {
            return image.id !== employee.id;
        });
        cache.writeQuery({
            query: queries.GET_USER_POSTED_IMAGES,
            data: { userPostedImages: userPostedImages },
        });
    },
});
 */

async function deleteComment(comm) {
    try{
    let postId = comm.postId
    let id = comm.id
    console.log("postId in deleteComment function", postId)
    console.log("commentId in deleteComment function", id)
    await deleteDoc(doc(db, "posts", postId,"comments", id));
    console.log("Document deleted with ID: ", id);
    }
    catch(e){
        console.error("Error deleting document: ", e);
    }
   
  }

console.log("delete modal..");
 /* const [removeEmployee] = useMutation(queries.DELETE_EMPLOYEE, {
    update(cache, {data: {removeEmployee}}) {
      const {employees} = cache.readQuery({
        query: queries.GET_EMPLOYEES
      });
      cache.writeQuery({
        query: queries.GET_EMPLOYEES,
        data: {
          employees: employees.filter((e) => e._id !== employee._id)
        }
      });
    }
  }); */

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setComment(null);
    props.handleClose();
  };

  return (
    <div>
      <ReactModal
        name='deleteModal'
        isOpen={showDeleteModal}
        contentLabel='Delete Employee'
        style={customStyles}
      >
      
        <div>
          <p>
            Are you sure you want to delete this comment?
            {/*  & {employee.id} ? */}
          </p>

          <form
            className='form'
            id='delete-employee'
            onSubmit={(e) => {
              e.preventDefault();
              console.log("comment check", comment);
             /*  deleteImage({
                variables: {
                  id: employee.id
                }
              }); */
              deleteComment(comment)
              setShowDeleteModal(false);
              alert('Comment has been deleted successfully.');
              props.handleClose();
            }}
          >
            <br />
            <br />
            <button className='button add-button' type='submit'>
              Delete Comment
            </button>
          </form>
        </div>

        <br />
        <br />
        <button
          className='button cancel-button'
          onClick={handleCloseDeleteModal}
        >
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default DeleteCommentModal;
