import { Status } from "@prisma/client"
import { Card, Text } from "@radix-ui/themes"
import Link from "next/link"

interface Props {
    open: number
    inProgress: number
    closed: number
}

const IssueSummary = (props: Props) => {

    const containers: { label: string, value: number, status: Status }[] = [
        { label: "Open Issues", value: props.open, status: 'OPEN' },
        { label: "In-progress Issues", value: props.inProgress, status: 'IN_PROGRESS' },
        { label: "Closed Issues", value: props.closed, status: 'CLOSED' },
    ]

    return (
        <div className="flex gap-5 cursor-default">
            {containers.map(container => (
                <Card key={container.label}>
                    <div className="flex flex-col gap-1 items-center">
                        <Link className="text-sm font-semibold" href={`/issues?status=${container.status}`}>{container.label}</Link>
                        <Text size="5" className="font-bold">{container.value}</Text>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default IssueSummary
