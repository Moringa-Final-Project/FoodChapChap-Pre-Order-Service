"""updated relationships

Revision ID: db11de06d61f
Revises: 49a9ba067c2d
Create Date: 2023-08-09 21:05:34.703540

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'db11de06d61f'
down_revision = '49a9ba067c2d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cartitems', schema=None) as batch_op:
        batch_op.add_column(sa.Column('order_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_order_id_cartitems', 'orders', ['order_id'], ['order_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cartitems', schema=None) as batch_op:
        batch_op.drop_constraint('fk_order_id_cartitems', type_='foreignkey')
        batch_op.drop_column('order_id')

    # ### end Alembic commands ###
