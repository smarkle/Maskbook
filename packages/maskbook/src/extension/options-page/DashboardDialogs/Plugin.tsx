import { useMemo } from 'react'

import { Card, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import DescriptionIcon from '@material-ui/icons/Description'
import FingerprintIcon from '@material-ui/icons/Fingerprint'

import { useI18N } from '../../../utils/i18n-next-ui'

import { DashboardDialogCore, DashboardDialogWrapper, WrappedDialogProps } from './Base'
import { DebounceButton } from '../DashboardComponents/ActionButton'
import type { PluginConfig } from '../../../plugins/types'

const useStyles = makeStyles((theme) =>
    createStyles({
        logo: {
            fontSize: 30,
        },
        section: {
            padding: '26px 0',
            margin: theme.spacing(3, 0),
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(2, 0),
            },
        },
        list: {
            [theme.breakpoints.down('sm')]: {
                marginLeft: theme.spacing(-2),
                marginRight: theme.spacing(-2),
            },
        },
        listItemRoot: {
            paddingTop: theme.spacing(1.5),
            paddingBottom: theme.spacing(1.5),
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        listItemText: {
            fontWeight: 500,
        },
    }),
)

interface PluginProps {
    plugin: PluginConfig
}

//#region persona create dialog
export function DashboardPluginDetailDialog({ ComponentProps, ...rest }: WrappedDialogProps<PluginProps>) {
    const { t } = useI18N()
    const classes = useStyles()

    const theme = useTheme()

    const metaFields = useMemo(() => {
        const plugin = ComponentProps?.plugin
        if (!plugin) {
            return []
        }
        return [
            {
                field: 'id',
                value: plugin.id,
                icon: <FingerprintIcon />,
            },
            {
                field: 'description',
                value: plugin.pluginDescription,
                icon: <DescriptionIcon />,
            },
        ]
    }, [ComponentProps?.plugin])

    return (
        <DashboardDialogCore fullScreen={false} {...rest}>
            <DashboardDialogWrapper
                icon={<span className={classes.logo}>{ComponentProps?.plugin.pluginIcon}</span>}
                primary={ComponentProps?.plugin.pluginName ?? '-'}
                secondary={' '}
                content={
                    <Paper className={classes.section} component="section" elevation={0}>
                        <Card elevation={0}>
                            <List className={classes.list} disablePadding>
                                {metaFields.map((meta) => (
                                    <ListItem
                                        key={meta.field}
                                        classes={{
                                            root: classes.listItemRoot,
                                        }}>
                                        <ListItemIcon>{meta.icon}</ListItemIcon>
                                        <ListItemText
                                            classes={{ primary: classes.listItemText }}
                                            primary={meta.value}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </Paper>
                }
                footer={
                    <DebounceButton type="submit" variant="contained" onClick={rest.onClose}>
                        {t('ok')}
                    </DebounceButton>
                }></DashboardDialogWrapper>
        </DashboardDialogCore>
    )
}
//#endregion
