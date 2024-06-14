import './Sheet.scss';

interface Sheet {
  id: number;
  name: string;
  image: string;
  class: string;
  level: number;
}

// function SheetInfo() {
//   const dispatch = useDispatch();
//   const { sheets } = useSelector;

//   return (
//     <div>
//       <Header />
//       <h1>Fiche Personnage</h1>
//       <div>
//         {error ? (
//           <p>{error}</p>
//         ) : sheet ? (
//           <div className="sheet">
//             <h2>{sheet.name}</h2>
//             <img src={sheet.image} alt={sheet.name} />
//             <p>Classe: {sheet.class}</p>
//             <p>Niveau: {sheet.level}</p>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default SheetInfo;