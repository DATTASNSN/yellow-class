import React from 'react';
import axios from 'axios';

import Modal from "react-modal";
import { BsFillCaretLeftFill,BsFillCaretRightFill } from 'react-icons/bs';
import './Pictures.css'

const customStyles = {
    content : {
      top                   : '30%',
      left                  : '25%',
      right                 : 'auto',
      bottom                : 'auto',
      width                 : '50%',
      height                : '50%',
      background            : 'transparent',
    }
  };
class Pictures extends React.Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
      id:'',
      loading: false,
      page: 0,
      prevY: 0,
    }
  }
  

  getPictures(page) {
    this.setState({ loading: true });
    axios
      .get(
        'https://api.unsplash.com/search/photos?query=london&client_id=ribDIB12qExVwBVZXk392PWEqRlkGdKTwenGefJ91o4'
      )
      .then(res => {
        this.setState({ pictures: res.data.results });
        this.setState({ loading: false });
      });
  }
  componentDidMount() {
    this.getPictures(this.state.page);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastPhoto = this.state.pictures[this.state.pictures.length - 1];
      const curPage = lastPhoto.albumId;
      this.getPictures(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }
  closeModal = (e)=>{
    this.setState({
      isOpen: false,
      view: false,
      image:"",
    })
  }

  viewImage = (image) =>{ 
    this.setState({
      isOpen: true,
      view: true,
      image: image,
    })
  }

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px",
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    return (
      <div>
        <ul>
          {this.state.pictures.map((result,i) => (
             <img src={result.user.profile_image.large}
              onClick={() => this.setState({image: result.user.profile_image.large,isOpen: true,id: i})}
              className="Pictures-logo" alt='' />
            
          ))}
          <div
            ref={loadingRef => (this.loadingRef = loadingRef)}
            style={loadingCSS}
          >
            <span style={loadingTextCSS}>Loading...</span>
          </div>
          <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button onClick={()=> (this.state.pictures.map((img,id)=> id === this.state.id-1 && (this.setState({image:img.user.profile_image.large,isOpen: true,id:this.state.id-1}))))}  className="ButtonStyle">
              <BsFillCaretLeftFill size='5em' className="IconChange" />
            </button>
            <img src={this.state.image} className="Pictures-large-logo text--center" alt='' />
            <button onClick={()=> (this.state.pictures.map((img,id)=> id === this.state.id+1 && (this.setState({image:img.user.profile_image.large,isOpen: true,id:this.state.id+1}))))}  className="ButtonStyle">
              <BsFillCaretRightFill size='5em' className="IconChange" />
            </button>
          </Modal>
        </ul>
      </div>
    );
  }
}
export default Pictures;