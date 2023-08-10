"""CartItem model wuth one-to-many rel from user and menuitem

Revision ID: 49a9ba067c2d
Revises: 25fe15e7f31a
Create Date: 2023-08-09 20:39:11.610911

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '49a9ba067c2d'
down_revision = '25fe15e7f31a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cartitems',
    sa.Column('cart_item_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('item_id', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['item_id'], ['menuitems.item_id'], name='fk_item_id_cartitems'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='fk_user_id_cartitems'),
    sa.PrimaryKeyConstraint('cart_item_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cartitems')
    # ### end Alembic commands ###
