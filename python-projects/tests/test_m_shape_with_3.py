import unittest

from support import run_solution


class MShapeWith3Test(unittest.TestCase):
    def test_case_01_3(self):
        """N = 3."""
        result = run_solution('m-shape-with-3', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '. . 0 . . . . 0 . . \n. 0 0 0 . . 0 0 0 . \n0 0 0 0 0 0 0 0 0 0 \n')

    def test_case_02_2(self):
        """N = 2."""
        result = run_solution('m-shape-with-3', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '. 0 . . 0 . \n0 0 0 0 0 0 \n')


if __name__ == "__main__":
    unittest.main()
