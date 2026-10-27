import unittest

from support import run_solution


class Pyramid9Test(unittest.TestCase):
    def test_case_01_n_3(self):
        """N = 3."""
        result = run_solution('pyramid-9', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '. . 0 . . \n. 0 0 0 . \n0 0 0 0 0 \n')

    def test_case_02_n_4(self):
        """N = 4."""
        result = run_solution('pyramid-9', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '. . . 0 . . . \n. . 0 0 0 . . \n. 0 0 0 0 0 . \n0 0 0 0 0 0 0 \n')


if __name__ == "__main__":
    unittest.main()
