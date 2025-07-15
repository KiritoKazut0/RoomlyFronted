import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';


interface RentsProps{
   estado: string,
   direccion: string,
   precio: string,
   imagen_main: string
}

export default function CardHome({estado, direccion, precio, imagen_main}: RentsProps) {
  return (
    <Card sx={{ width: 320 }}>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={imagen_main}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
        <Typography level="title-lg">{estado}</Typography>
        <Typography level="body-sm">{direccion}</Typography>
      </div>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>${precio}</Typography>
        </div>

        <Button
          variant="outlined"
          size="md"
          color="primary"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Ver más 
        </Button>
      </CardContent>
    </Card>
  );
}