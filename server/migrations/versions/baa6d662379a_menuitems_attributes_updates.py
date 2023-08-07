"""MenuItems attributes Updates

Revision ID: baa6d662379a
Revises: 25fe15e7f31a
Create Date: 2023-08-07 12:41:22.402301

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'baa6d662379a'
down_revision = '25fe15e7f31a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menuitems', schema=None) as batch_op:
        batch_op.add_column(sa.Column('item_image', sa.String(length=100), nullable=False))
        batch_op.drop_column('customization_options')
        batch_op.drop_column('item_category')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menuitems', schema=None) as batch_op:
        batch_op.add_column(sa.Column('item_category', sa.VARCHAR(length=100), nullable=False))
        batch_op.add_column(sa.Column('customization_options', sa.VARCHAR(length=100), nullable=False))
        batch_op.drop_column('item_image')

    # ### end Alembic commands ###
