import { useHistory } from 'react-router';
import React from 'react';
import './UserProfile.css'

const PinBoardCard = ({board}) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`boards/${board.id}`)
    }
    return (
        <div onClick={onClick}>
            <div className='pinned-board-container'>

                <img className='board-image' src={board.boardImages[0] ? board.boardImages[0] : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDRUPDw8VFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ0NFSsZFR0rKy0tKysrKystKy0tLSsrNy03KystLSsrKy0tKzctKy0tKy0rLS0rKy0rLS0rKysrK//AABEIAMQBAQMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAJRABAAIBAgUEAwAAAAAAAAAAAAHwETGhIUGRsdECUWHhcYHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAIf/aAAwDAQACEQMRAD8A7gAgl/KiACgCXVUugHRS8kuoF4gAAAF9wFLoX3LqAACAKAhdVBLqqXQAvAFAAAAAx8icAFAAAAAAABFAAABFARQAvJFAS2FAAABLot0AAAAAAAAAMgKACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH7AAAAAAAABQAAAAAARQAAAAAAAAAAAAABAAAAAAUAAAAAAEUAQBUAAAAABRAUQBQAAAAAABAAAMgAAAAoAAACCoCoACoAAIAAACgAACgAAAAAAAAACAAAAoAAAAACKIAoAgqIAqAqKiioogigoAAAAAAACGQwFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQFRAEAAAAAAAAUAAAAAlAAAAUAAAAAAABAAAADAAAAAAAAoAAAAAACIKJkBRDIKIAoCgAAAAAIAAAAomFBBAFEBQAAEBRAFBAATKCiEAsjOVBRMqCiKoCAKIoCoAogIogCDWYBUAAELdgVC28gAJJkAygC5EMgAZBJORMHqQCJI1MAoQYUFymQFEAUIIvUALehbsCiW3mtt5AAAvEZ4e4It2S7AKs634QAL3L2QEX7RAVS9vIACALKABBOoAHqACVQBZEAWDwAI15QBYu5F2AQi7F2+wFW/wu+ABrACo/9k=' } alt={board.name} />
                <img className='board-image' src={board.boardImages[1] ? board.boardImages[1] : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDRUPDw8VFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ0NFSsZFR0rKy0tKysrKystKy0tLSsrNy03KystLSsrKy0tKzctKy0tKy0rLS0rKy0rLS0rKysrK//AABEIAMQBAQMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAJRABAAIBAgUEAwAAAAAAAAAAAAHwETGhIUGRsdECUWHhcYHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAIf/aAAwDAQACEQMRAD8A7gAgl/KiACgCXVUugHRS8kuoF4gAAAF9wFLoX3LqAACAKAhdVBLqqXQAvAFAAAAAx8icAFAAAAAAABFAAABFARQAvJFAS2FAAABLot0AAAAAAAAAMgKACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH7AAAAAAAABQAAAAAARQAAAAAAAAAAAAABAAAAAAUAAAAAAEUAQBUAAAAABRAUQBQAAAAAABAAAMgAAAAoAAACCoCoACoAAIAAACgAACgAAAAAAAAACAAAAoAAAAACKIAoAgqIAqAqKiioogigoAAAAAAACGQwFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQFRAEAAAAAAAAUAAAAAlAAAAUAAAAAAABAAAADAAAAAAAAoAAAAAACIKJkBRDIKIAoCgAAAAAIAAAAomFBBAFEBQAAEBRAFBAATKCiEAsjOVBRMqCiKoCAKIoCoAogIogCDWYBUAAELdgVC28gAJJkAygC5EMgAZBJORMHqQCJI1MAoQYUFymQFEAUIIvUALehbsCiW3mtt5AAAvEZ4e4It2S7AKs634QAL3L2QEX7RAVS9vIACALKABBOoAHqACVQBZEAWDwAI15QBYu5F2AQi7F2+wFW/wu+ABrACo/9k=' } alt={board.name} />
                <img className='board-image' src={board.boardImages[2] ? board.boardImages[2] : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDRUPDw8VFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ0NFSsZFR0rKy0tKysrKystKy0tLSsrNy03KystLSsrKy0tKzctKy0tKy0rLS0rKy0rLS0rKysrK//AABEIAMQBAQMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAJRABAAIBAgUEAwAAAAAAAAAAAAHwETGhIUGRsdECUWHhcYHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAIf/aAAwDAQACEQMRAD8A7gAgl/KiACgCXVUugHRS8kuoF4gAAAF9wFLoX3LqAACAKAhdVBLqqXQAvAFAAAAAx8icAFAAAAAAABFAAABFARQAvJFAS2FAAABLot0AAAAAAAAAMgKACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH7AAAAAAAABQAAAAAARQAAAAAAAAAAAAABAAAAAAUAAAAAAEUAQBUAAAAABRAUQBQAAAAAABAAAMgAAAAoAAACCoCoACoAAIAAACgAACgAAAAAAAAACAAAAoAAAAACKIAoAgqIAqAqKiioogigoAAAAAAACGQwFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQFRAEAAAAAAAAUAAAAAlAAAAUAAAAAAABAAAADAAAAAAAAoAAAAAACIKJkBRDIKIAoCgAAAAAIAAAAomFBBAFEBQAAEBRAFBAATKCiEAsjOVBRMqCiKoCAKIoCoAogIogCDWYBUAAELdgVC28gAJJkAygC5EMgAZBJORMHqQCJI1MAoQYUFymQFEAUIIvUALehbsCiW3mtt5AAAvEZ4e4It2S7AKs634QAL3L2QEX7RAVS9vIACALKABBOoAHqACVQBZEAWDwAI15QBYu5F2AQi7F2+wFW/wu+ABrACo/9k=' } alt={board.name} />

            </div>
        </div>
    )
}
export default PinBoardCard;