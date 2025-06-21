import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { challenges } from '../data/challenges';
import FlagSubmit from '../components/Challenge/FlagSubmit';

export default function Challenges() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Доступные задачи</Typography>
      <Grid container spacing={3}>
        {challenges.map((challenge) => (
          <Grid item xs={12} md={6} lg={4} key={challenge.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5">{challenge.title}</Typography>
                <Typography color="text.secondary">{challenge.category}</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>{challenge.description}</Typography>
                {/* Добавляем компонент отправки флага для каждого челенджа */}
                <FlagSubmit challengeId={challenge.id} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}