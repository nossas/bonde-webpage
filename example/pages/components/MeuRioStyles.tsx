import styled from 'styled-components';

const MeuRioStyles = styled.div`
.meurio-scheme {
  .widget {
    color: #444;

    a {
      color: #119146;
    }
    .button {
      color: white;    
    }
  }

  .bg-1 {
    background-color: #039046;
  }
  .bg-2 {
    background-color: #2BBAE2;
  }
  .bg-3 {
    background-color: #FFCF01;
  }
  .bg-4 {
    background-color: #EF7F3A;
  }
  .bg-5 {
    background-color: #ED1C24;
  }
  .bg-6 {
    background-color: #DF499A;
  }
  .bg-7 {
    background-color: #8C78B7;
  }
  .bg-8 {
    background-color: #353A3D;
  }

  .bg-1,
  .bg-2,
  .bg-3,
  .bg-4,
  .bg-5,
  .bg-6,
  .bg-7,
  .bg-8 {
    .widget {
      color: white;
      h1, h2, h3, h4, h5, h6 { color: white }
    }
  }
}

`

export default MeuRioStyles;