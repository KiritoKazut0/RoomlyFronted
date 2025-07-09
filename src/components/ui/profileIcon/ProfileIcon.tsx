import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export interface ProfileIconProps {
    name: string;
    email: string;
    image: string
    compact?: boolean;
}

export default function ProfileIcon(props: ProfileIconProps) {
    const { compact = false, email, image, name } = props;

    if (compact) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
            }}>
                <Avatar
                    alt={name}
                    src={image}
                    sx={{
                        width: 32,
                        height: 32,
                        border: '2px solid #ecf0f1'
                    }}
                />
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '12px',
            transition: 'background-color 0.2s ease',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                mr: 1
            }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#ecf0f1',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        lineHeight: 1.2
                    }}
                >
                  {name}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: '#bdc3c7',
                        fontSize: '12px',
                        lineHeight: 1.2
                    }}
                >
                   {email}
                </Typography>
            </Box>
            <Avatar
                alt={name}
                src={image}
                sx={{
                    width: 40,
                    height: 40,
                    border: '2px solid #ecf0f1'
                }}
            />
        </Box>
    );
}