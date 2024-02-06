import { User } from '../entities/User'; // Import your User type

declare global {
    namespace Express {
        interface Request {
            user?: User; // Define the user property as optional
        }
    }
}
