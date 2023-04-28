import Card from './Card';

export default function Cards({characters, onClose}) {
   return (
      <div style={{display: "flex",
                  padding: "10px"}}>
         {
            characters.map(({ id, name, status, species, gender, origin, image }) => {
               return (
                  <Card
                     key = {id}
                     id = {id}
                     name = {name}
                     status = {status}
                     species = {species}
                     gender = {gender}
                     orgin = {origin.name}
                     image = {image}
                     onClose={onClose}
                     />
               )
            })
         }
      </div>
   )
}
